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

package com.adobe.marketing.mobile.cordova;

import com.adobe.marketing.mobile.Signal;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class ACPSignal_Cordova extends CordovaPlugin {

    // ===============================================================
    // all calls filter through this method
    // ===============================================================
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("extensionVersion".equals(action)) {
            this.extensionVersionSignal(callbackContext);
            return true;
        }

        return false;
    }

    // ===============================================================
    // Signal Methods
    // ===============================================================
    private void extensionVersionSignal(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                final String version = Signal.extensionVersion();
                callbackContext.success(version);
            }
        });
    }
}
