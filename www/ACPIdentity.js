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

var ACPIdentity = (function() {
	var ACPIdentity = (typeof exports !== 'undefined') && exports || {};
	var exec = cordova.require('cordova/exec'); // eslint-disable-line no-undef

	var PLUGIN_NAME = "ACPIdentity_Cordova";

	//===========================================================================
	// public enums
	// ===========================================================================
	ACPIdentity.ACPMobileVisitorAuthenticationStateUnknown = 0;
	ACPIdentity.ACPMobileVisitorAuthenticationStateAuthenticated = 1;
	ACPIdentity.ACPMobileVisitorAuthenticationStateLoggedOut = 2;

	// ===========================================================================
	// public APIs
	// ===========================================================================
	// Identity
	ACPIdentity.extensionVersion = function(success, fail) {
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

	ACPIdentity.appendVisitorInfoForUrl = function(url, success, fail) {
		var FUNCTION_NAME = "appendVisitorInfoForUrl";

		if (success && !acpIsFunction(success)) {
			acpPrintNotAFunction("success", FUNCTION_NAME);
			return;
		}

		if (fail && !acpIsFunction(fail)) {
			acpPrintNotAFunction("fail", FUNCTION_NAME);
			return;
		}

		if (!acpIsString(url)) {
			acpPrintNotAString("url", FUNCTION_NAME);
			return;
		}

		return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [url]);
	};

	ACPIdentity.getExperienceCloudId = function(success, fail) {
		var FUNCTION_NAME = "getExperienceCloudId";

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

	ACPIdentity.getIdentifiers = function(success, fail) {
		var FUNCTION_NAME = "getIdentifiers";

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

	ACPIdentity.getUrlVariables = function(success, fail) {
		var FUNCTION_NAME = "getUrlVariables";

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

	ACPIdentity.syncIdentifier = function(identifierType, identifier, authState, success, fail) {
		var FUNCTION_NAME = "syncIdentifier";

		if (success && !acpIsFunction(success)) {
			acpPrintNotAFunction("success", FUNCTION_NAME);
			return;
		}

		if (fail && !acpIsFunction(fail)) {
			acpPrintNotAFunction("fail", FUNCTION_NAME);
			return;
		}

		if (!acpIsString(identifierType)) {
			acpPrintNotAString("identifier type", FUNCTION_NAME);
			return;
		}

		if (!acpIsString(identifier)) {
			acpPrintNotAString("identifier value", FUNCTION_NAME);
			return;
		}

		if (!acpIsNumber(authState)) {
			acpPrintNotANumber("authState", FUNCTION_NAME);
			return;
		}

		return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [identifierType, identifier, authState]);
	};

	ACPIdentity.syncIdentifiers = function(identifiers, authState, success, fail) {
		var FUNCTION_NAME = "syncIdentifiers";

		if (success && !acpIsFunction(success)) {
			acpPrintNotAFunction("success", FUNCTION_NAME);
			return;
		}

		if (fail && !acpIsFunction(fail)) {
			acpPrintNotAFunction("fail", FUNCTION_NAME);
			return;
		}

		if (!acpIsObject(identifiers)) {
			acpPrintNotAnObject("identifiers", FUNCTION_NAME);
			return;
		}

		if (!acpIsNumber(authState)) {
			// syncIdentifiers has an overload with an authentication state value.
			// if the authentication State is not provided, the authState variable will be the success function.
			if (!acpIsFunction(authState)) {
				acpPrintNotANumber("authState", FUNCTION_NAME);
				return;
			} else {
				return exec(authState, fail, PLUGIN_NAME, FUNCTION_NAME, [identifiers, 3]);
			}
		}

		return exec(success, fail, PLUGIN_NAME, FUNCTION_NAME, [identifiers, authState]);
	};

	return ACPIdentity;

}());

module.exports = ACPIdentity;