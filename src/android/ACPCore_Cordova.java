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

import com.adobe.marketing.mobile.AdobeCallback;
import com.adobe.marketing.mobile.Event;
import com.adobe.marketing.mobile.Event.Builder;
import com.adobe.marketing.mobile.ExtensionError;
import com.adobe.marketing.mobile.ExtensionErrorCallback;
import com.adobe.marketing.mobile.LoggingMode;
import com.adobe.marketing.mobile.MobileCore;
import com.adobe.marketing.mobile.MobilePrivacyStatus;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Iterator;

public class ACPCore_Cordova extends CordovaPlugin {
	final static String METHOD_CORE_DISPATCH_EVENT = "dispatchEvent";
    final static String METHOD_CORE_DISPATCH_EVENT_WITH_RESPONSE_CALLBACK = "dispatchEventWithResponseCallback";
    final static String METHOD_CORE_DISPATCH_RESPONSE_EVENT = "dispatchResponseEvent";
    final static String METHOD_CORE_DOWNLOAD_RULES = "downloadRules";
    final static String METHOD_CORE_EXTENSION_VERSION_CORE = "extensionVersion";
    final static String METHOD_CORE_GET_PRIVACY_STATUS = "getPrivacyStatus";
    final static String METHOD_CORE_GET_SDK_IDENTITIES = "getSdkIdentities";
    final static String METHOD_CORE_SET_ADVERTISING_IDENTIFIER = "setAdvertisingIdentifier";
    final static String METHOD_CORE_SET_LOG_LEVEL = "setLogLevel";
    final static String METHOD_CORE_SET_PRIVACY_STATUS = "setPrivacyStatus";
    final static String METHOD_CORE_TRACK_ACTION = "trackAction";
    final static String METHOD_CORE_TRACK_STATE = "trackState";
    final static String METHOD_CORE_UPDATE_CONFIGURATION = "updateConfiguration";

    // ===============================================================
    // all calls filter through this method
    // ===============================================================
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (METHOD_CORE_DISPATCH_EVENT.equals(action)) {
            this.dispatchEvent(args, callbackContext);
            return true;
        } else if (METHOD_CORE_DISPATCH_EVENT_WITH_RESPONSE_CALLBACK.equals(action)) {
             this.dispatchEventWithResponseCallback(args, callbackContext);
             return true;
        } else if (METHOD_CORE_DISPATCH_RESPONSE_EVENT.equals(action)) {
             this.dispatchResponseEvent(args, callbackContext);
             return true;
        } else if (METHOD_CORE_DOWNLOAD_RULES.equals(action)) {
             this.downloadRules(callbackContext);
             return true;
        } else if (METHOD_CORE_EXTENSION_VERSION_CORE.equals(action)) {
             this.extensionVersion(callbackContext);
             return true;
        } else if (METHOD_CORE_GET_PRIVACY_STATUS.equals(action)) {
             this.getPrivacyStatus(callbackContext);
             return true;
        } else if (METHOD_CORE_GET_SDK_IDENTITIES.equals(action)) {
             this.getSdkIdentities(callbackContext);
             return true;
        } else if (METHOD_CORE_SET_ADVERTISING_IDENTIFIER.equals(action)) {
             this.setAdvertisingIdentifier(args, callbackContext);
             return true;
        } else if (METHOD_CORE_SET_LOG_LEVEL.equals(action)) {
             this.setLogLevel(args, callbackContext);
             return true;
        } else if (METHOD_CORE_SET_PRIVACY_STATUS.equals(action)) {
             this.setPrivacyStatus(args, callbackContext);
             return true;
        } else if (METHOD_CORE_TRACK_ACTION.equals(action)) {
             this.trackAction(args, callbackContext);
             return true;
        } else if (METHOD_CORE_TRACK_STATE.equals(action)) {
             this.trackState(args, callbackContext);
             return true;
        } else if (METHOD_CORE_UPDATE_CONFIGURATION.equals(action)) {
             this.updateConfiguration(args, callbackContext);
             return true;
        }

        return false;
    }

    // ===============================================================
    // MobileCore Methods
    // ===============================================================
    private void dispatchEvent(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final HashMap<String, Object> eventMap = getObjectMapFromJSON(args.getJSONObject(0));
                    final Event event = getEventFromMap(eventMap);

                    MobileCore.dispatchEvent(event, new ExtensionErrorCallback<ExtensionError>() {
                        @Override
                        public void error(ExtensionError extensionError) {
                            callbackContext.error(extensionError.getErrorName());
                        }
                    });

                    callbackContext.success();
                } catch (Exception ex) {
                    final String errorMessage = String.format("Exception in call to dispatchEvent: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void dispatchEventWithResponseCallback(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final HashMap<String, Object> eventMap = getObjectMapFromJSON(args.getJSONObject(0));
                    final Event event = getEventFromMap(eventMap);

                    MobileCore.dispatchEventWithResponseCallback(event, new AdobeCallback<Event>() {
                        @Override
                        public void call(Event event) {
                            final HashMap<String, Object> eventMap = getMapFromEvent(event);
                            final JSONObject eventJson = new JSONObject(eventMap);
                            callbackContext.success(eventJson);
                        }
                    }, new ExtensionErrorCallback<ExtensionError>() {
                        @Override
                        public void error(ExtensionError extensionError) {
                            callbackContext.error(extensionError.getErrorName());
                        }
                    });

                    callbackContext.success();
                } catch (Exception ex) {
                    final String errorMessage = String.format("Exception in call to dispatchEventWithResponseCallback: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void dispatchResponseEvent(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final HashMap<String, Object> responseEventMap = getObjectMapFromJSON(args.getJSONObject(0));
                    final Event responseEvent = getEventFromMap(responseEventMap);
                    final HashMap<String, Object> requestEventMap = getObjectMapFromJSON(args.getJSONObject(1));
                    final Event requestEvent = getEventFromMap(requestEventMap);

                    MobileCore.dispatchResponseEvent(responseEvent, requestEvent, new ExtensionErrorCallback<ExtensionError>() {
                        @Override
                        public void error(ExtensionError extensionError) {
                            callbackContext.error(extensionError.getErrorName());
                        }
                    });

                    callbackContext.success();
                } catch (Exception ex) {
                    final String errorMessage = String.format("Exception in call to dispatchResponseEvent: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void downloadRules(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                // TODO: this method is not implemented in Android
                callbackContext.success();
            }
        });
    }

    private void extensionVersion(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                final String version = MobileCore.extensionVersion();
                callbackContext.success(version);
            }
        });
    }

    private void getPrivacyStatus(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                MobileCore.getPrivacyStatus(new AdobeCallback<MobilePrivacyStatus>() {
                    @Override
                    public void call(MobilePrivacyStatus mobilePrivacyStatus) {
                        callbackContext.success(mobilePrivacyStatus.getValue());
                    }
                });
            }
        });
    }

    private void getSdkIdentities(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                MobileCore.getSdkIdentities(new AdobeCallback<String>() {
                    @Override
                    public void call(String s) {
                        callbackContext.success(s);
                    }
                });
            }
        });
    }

    private void setAdvertisingIdentifier(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final String newAdId = args.getString(0);
                    MobileCore.setAdvertisingIdentifier(newAdId);
                    callbackContext.success();
                } catch (final Exception ex) {
                    final String errorMessage = String.format("Exception in call to setAdvertisingIdentifier: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void setLogLevel(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    LoggingMode newLogLevel;
                    switch (args.getInt(0)) {
                        case 0:
                        default:
                            newLogLevel = LoggingMode.ERROR;
                            break;
                        case 1:
                            newLogLevel = LoggingMode.WARNING;
                            break;
                        case 2:
                            newLogLevel = LoggingMode.DEBUG;
                            break;
                        case 3:
                            newLogLevel = LoggingMode.VERBOSE;
                            break;
                    }
                    MobileCore.setLogLevel(newLogLevel);
                    callbackContext.success();
                } catch (final Exception ex) {
                    final String errorMessage = String.format("Exception in call to setLogLevel: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void setPrivacyStatus(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    MobilePrivacyStatus newPrivacyStatus;
                    switch (args.getInt(0)) {
                        case 0:
                            newPrivacyStatus = MobilePrivacyStatus.OPT_IN;
                            break;
                        case 1:
                            newPrivacyStatus = MobilePrivacyStatus.OPT_OUT;
                            break;
                        case 2:
                        default:
                            newPrivacyStatus = MobilePrivacyStatus.UNKNOWN;
                            break;
                    }
                    MobileCore.setPrivacyStatus(newPrivacyStatus);
                    callbackContext.success();
                } catch (final Exception ex) {
                    final String errorMessage = String.format("Exception in call to setPrivacyStatus: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void trackAction(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final String action = args.getString(0);
                    final HashMap<String, String> contextData = getStringMapFromJSON(args.getJSONObject(1));

                    MobileCore.trackAction(action, contextData);
                    callbackContext.success();
                } catch (final Exception ex) {
                    final String errorMessage = String.format("Exception in call to trackAction: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void trackState(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final String state = args.getString(0);
                    final HashMap<String, String> contextData = getStringMapFromJSON(args.getJSONObject(1));

                    MobileCore.trackState(state, contextData);
                    callbackContext.success();
                } catch (final Exception ex) {
                    final String errorMessage = String.format("Exception in call to trackState: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    private void updateConfiguration(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final HashMap<String, Object> newConfig = getObjectMapFromJSON(args.getJSONObject(0));

                    MobileCore.updateConfiguration(newConfig);
                    callbackContext.success();
                } catch (final Exception ex) {
                    final String errorMessage = String.format("Exception in call to updateConfiguration: %s", ex.getLocalizedMessage());
                    MobileCore.log(LoggingMode.WARNING, "AEP SDK", errorMessage);
                    callbackContext.error(errorMessage);
                }
            }
        });
    }

    // ===============================================================
    // Helpers
    // ===============================================================
    private HashMap<String, String> getStringMapFromJSON(JSONObject data) {
        HashMap<String, String> map = new HashMap<String, String>();
        @SuppressWarnings("rawtypes")
        Iterator it = data.keys();
        while (it.hasNext()) {
            String n = (String) it.next();
            try {
                map.put(n, data.getString(n));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return map;
    }

    private HashMap<String, Object> getObjectMapFromJSON(JSONObject data) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        @SuppressWarnings("rawtypes")
        Iterator it = data.keys();
        while (it.hasNext()) {
            String n = (String) it.next();
            try {
                map.put(n, data.getString(n));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return map;
    }

    private Event getEventFromMap(final HashMap<String, Object> event) throws Exception {
        return new Event.Builder(
                event.get("name").toString(),
                event.get("type").toString(),
                event.get("source").toString()
        ).setEventData(getObjectMapFromJSON(new JSONObject(event.get("data").toString()))).build();
    }

    private HashMap<String, Object> getMapFromEvent(final Event event) {
        final HashMap<String, Object> eventMap = new HashMap<>();
        eventMap.put("name", event.getName());
        eventMap.put("type", event.getType());
        eventMap.put("source", event.getSource());
        eventMap.put("data", event.getEventData());

        return eventMap;
    }

    // ===============================================================
    // Plugin lifecycle events
    // ===============================================================
    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        MobileCore.setApplication(this.cordova.getActivity().getApplication());
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
    }
}
