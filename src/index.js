/*!
 * Copyright (c) 2017 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs, context) {
        var that = this;
        this._rs485 = inputs['rs485'];
    },
    detach: function (callback) {
        this._rs485.close();
    },
    exports: {
        setup: function (options, callback) {
            this._rs485.setup(options, callback);
        },
        open: function () {
            var that = this;
            this._rs485.on('data', function (data) {
                that.emit('data', data);
            });
        },
        write: function (data, callback) {
            this._rs485.write(data, callback);
        }
    }
});
