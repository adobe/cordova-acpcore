/*
 Copyright 2020 Adobe. All rights reserved.
 This file is licensed to you under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License. You may obtain a copy
 of the License at http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 OF ANY KIND, either express or implied. See the License for the specific language
 governing permissions and limitations under the License.
*/

var ACPCore = (function() {
    var ACPCore = (typeof exports !== 'undefined') && exports || {};
    var exec = cordova.require('cordova/exec'); // eslint-disable-line no-undef

    var PLUGIN_NAME = "ACPCore_Cordova";

    // ===========================================================================
    // public objects
    // ===========================================================================
    ACPCore.createEvent = function(name, type, source, data) {
        return {
            name: name,
            type: type,
            source: source,
            data: data
        };
    };

    // ===========================================================================
    // public enums
    // ===========================================================================
    ACPCore.ACPMobilePrivacyStatusOptIn = 0;
    ACPCore.ACPMobilePrivacyStatusOptOut = 1;
    ACPCore.ACPMobilePrivacyStatusUnknown = 2;

    ACPCore.ACPMobileLogLevelError = 0;
    ACPCore.ACPMobileLogLevelWarning = 1;
    ACPCore.ACPMobileLogLevelDebug = 2;
    ACPCore.ACPMobileLogLevelVerbose = 3;

    // ===========================================================================
    // public APIs
    // ===========================================================================
    ACPCore.dispatchEvent = function(sdkEvent, success, fail) {
        var FUNCTION_NAME = "dispatchEvent";

        if (!acpIsValidEvent(sdkEvent)) {
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [sdkEvent]);
    };

    ACPCore.dispatchEventWithResponseCallback = function(sdkEvent, success, fail) {
        var FUNCTION_NAME = "dispatchEventWithResponseCallback";

        if (!acpIsValidEvent(sdkEvent)) {
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [sdkEvent]);
    };

    ACPCore.dispatchResponseEvent = function(responseEvent, requestEvent, success, fail) {
        var FUNCTION_NAME = "dispatchResponseEvent";

        if (!acpIsValidEvent(responseEvent)) {
            return;
        }

        if (!acpIsValidEvent(requestEvent)) {
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [responseEvent, requestEvent]);
    };

    ACPCore.downloadRules = function(success, fail) {
        var FUNCTION_NAME = "downloadRules";

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, []);
    };

    ACPCore.extensionVersion = function(success, fail) {
        var FUNCTION_NAME = "extensionVersion";

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, []);
    };

    ACPCore.getPrivacyStatus = function(success, fail) {
        var FUNCTION_NAME = "getPrivacyStatus";

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, []);
    };

    ACPCore.getSdkIdentities = function(success, fail) {
        var FUNCTION_NAME = "getSdkIdentities";

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, []);
    };

    ACPCore.setAdvertisingIdentifier = function(identifier, success, fail) {
        var FUNCTION_NAME = "setAdvertisingIdentifier";

        if (!acpIsString(identifier)) {
            acpPrintNotAString("identifier", FUNCTION_NAME);
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [identifier]);
    };

    ACPCore.setLogLevel = function(logLevel, success, fail) {
        var FUNCTION_NAME = "setLogLevel";

        if (!acpIsNumber(logLevel)) {
            acpPrintNotANumber("logLevel", FUNCTION_NAME);
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [logLevel]);
    };

    ACPCore.setPrivacyStatus = function(privacyStatus, success, fail) {
        var FUNCTION_NAME = "setPrivacyStatus";

        if (!acpIsNumber(privacyStatus)) {
            acpPrintNotANumber("privacyStatus", FUNCTION_NAME);
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [privacyStatus]);
    };

    ACPCore.trackAction = function(action, contextData, success, fail) {
        var FUNCTION_NAME = "trackAction";

        if (!acpIsString(action)) {
            acpPrintNotAString("action", FUNCTION_NAME);
            return;
        }

        if (contextData && !acpIsObject(contextData)) {
            acpPrintNotAnObject("contextData", FUNCTION_NAME);
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [action, contextData]);
    };

    ACPCore.trackState = function(state, contextData, success, fail) {
        var FUNCTION_NAME = "trackState";

        if (!acpIsString(state)) {
            acpPrintNotAString("state", FUNCTION_NAME);
            return;
        }

        if (contextData && !acpIsObject(contextData)) {
            acpPrintNotAnObject("contextData", FUNCTION_NAME);
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [state, contextData]);
    };

    ACPCore.updateConfiguration = function(config, success, fail) {
        var FUNCTION_NAME = "updateConfiguration";

        if (!acpIsObject(config)) {
            acpPrintNotAnObject("config", FUNCTION_NAME);
            return;
        }

        if (success && !acpIsFunction(success)) {
            acpPrintNotAFunction("success", FUNCTION_NAME);
            return;
        }

        if (fail && !acpIsFunction(fail)) {
            acpPrintNotAFunction("fail", FUNCTION_NAME);
            return;
        }

        return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [config]);
    };

return ACPCore;

}());

// ===========================================================================
// input sanitization
// ===========================================================================
window.acpIsString = function (value) {
    return typeof value === 'string' || value instanceof String;
};

window.acpPrintNotAString = function (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be a String.");
};

window.acpIsNumber = function (value) {
    return typeof value === 'number' && isFinite(value);
};

window.acpPrintNotANumber = function (paramName, functionName) {
    if(functionName == 'syncIdentifiers') {
        console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be a Number or Null.");
    } else {
        console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be a Number.");
    }
};

window.acpIsObject = function (value) {
    return value && typeof value === 'object' && value.constructor === Object;
};

window.acpPrintNotAnObject = function (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be an Object.");
};

window.acpIsFunction = function (value) {
    return typeof value === 'function';
};

window.acpPrintNotAFunction = function (paramName, functionName) {
    console.log("Ignoring call to '" + functionName + "'. The '" + paramName + "' parameter is required to be a function.");
};

window.acpIsValidEvent = function (event) {
    if (!acpIsString(event.name)) {
        console.log("Event.name must be of type String.");
        return false;
    }

    if (!acpIsString(event.type)) {
        console.log("Event.type must be of type String.");
        return false;
    }

    if (!acpIsString(event.source)) {
        console.log("Event.source must be of type String.");
        return false;
    }

    if (!acpIsObject(event.data)) {
        console.log("Event.data must be of type Object.");
        return false;
    }

    return true;
};

module.exports = ACPCore;
