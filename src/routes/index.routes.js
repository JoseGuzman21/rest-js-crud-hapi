// const { Server, Request, ResponseToolkit } = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Task = require('./../models/Task');

const routes = (server) => {
    server.route({
        method: 'POST',
        path: '/tasks',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(5).required(),
                    description: Joi.string().min(10).required()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi
                        ? h.response(error.details[0]).takeover()
                        : h.response(error).takeover();
                }
            }
        },
        handler: async (req, h) => {
            try {
                const taskAdded = new Task(req.payload);
                const taskSaved = await taskAdded.save();
                return h.response({ message: 'Task added succesfully', data: taskSaved })
            } catch (err) {
                return h.response({ message: 'error' + err.message, data: {} })
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/tasks',
        handler: async (req, h) => {
            try {
                const tasks = await Task.find();
                return h.response({ message: 'Tasks get succesfully', data: tasks })
            } catch (err) {
                return h.response({ message: 'error' + err.message, data: {} })
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/tasks/{taskId}',
        handler: async (req, h) => {
            try {
                const { taskId } = req.params;
                const task = await Task.findById(taskId);
                return h.response({ message: 'Task get succesfully', data: task })
            } catch (err) {
                return h.response({ message: 'error' + err.message, data: {} })
            }
        }
    });

    server.route({
        method: 'PUT',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(5).optional(),
                    description: Joi.string().min(10).optional()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi
                        ? h.response(error.details[0]).takeover()
                        : h.response(error).takeover();
                }
            }
        },
        path: '/tasks/{taskId}',
        handler: async (req, h) => {
            try {
                const { taskId } = req.params;
                const taskUpdated = await Task.findByIdAndUpdate(taskId, req.payload, { new: true });
                return h.response({ message: 'Task get succesfully', data: taskUpdated })
            } catch (err) {
                return h.response({ message: 'error' + err.message, data: {} })
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/tasks/{taskId}',
        handler: async (req, h) => {
            try {
                const { taskId } = req.params;
                const taskDeleted = await Task.findByIdAndRemove(taskId);
                return h.response({ message: 'Task get succesfully', data: taskDeleted })
            } catch (err) {
                return h.response({ message: 'error' + err.message, data: {} })
            }
        }
    });
}

module.exports = routes;