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
import com.adobe.marketing.mobile.Identity;
import com.adobe.marketing.mobile.VisitorID;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

public class ACPIdentity_Cordova extends CordovaPlugin {

    // ===============================================================
    // all calls filter through this method
    // ===============================================================
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if ("extensionVersion".equals(action)) {
            extensionVersion(callbackContext);
            return true;
        } else if (action.equals("appendVisitorInfoForUrl")) {
            appendVisitorInfoForUrl(args, callbackContext);
            return true;
        } else if (action.equals("getExperienceCloudId")) {
            getExperienceCloudId(callbackContext);
            return true;
        } else if (action.equals("getIdentifiers")) {
            getIdentifiers(callbackContext);
            return true;
        } else if (action.equals("getUrlVariables")) {
            getUrlVariables(callbackContext);
            return true;
        } else if (action.equals("syncIdentifier")) {
            syncIdentifier(args, callbackContext);
            return true;
        } else if (action.equals("syncIdentifiers")) {
            syncIdentifiers(args, callbackContext);
            return true;
        }

        return false;
    }

    private void extensionVersion(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                String version = Identity.extensionVersion();
                callbackContext.success(version);
            }
        });
    }

    private void appendVisitorInfoForUrl(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                String url = null;
                try {
                    if(!args.getString(0).equals("null")) {
                        url = args.getString(0);
                    }else{
                        callbackContext.error("appendVisitorInfoForURL - Please enter a valid URL.");
                        return;
                    }
                }catch (JSONException e) {
                    callbackContext.error(e.getMessage());
                    return;
                }
                Identity.appendVisitorInfoForURL(url, new AdobeCallback<String>() {
                    @Override
                    public void call(String urlWithVisitorData) {
                        callbackContext.success(urlWithVisitorData);
                    }
                });
            }
        });
    }

    private void getExperienceCloudId(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                Identity.getExperienceCloudId(new AdobeCallback<String>() {
                    @Override
                    public void call(String experienceCloudId) {
                        callbackContext.success(experienceCloudId);
                    }
                });
            }
        });
    }

    private void getIdentifiers(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                Identity.getIdentifiers(new AdobeCallback<List<VisitorID>>() {
                    @Override
                    public void call(List<VisitorID> ids) {
                        String visitorIdsString = "";
                        if (ids.isEmpty()) {
                            visitorIdsString = "[]";
                        } else {
                            for (VisitorID id: ids) {
                                visitorIdsString = visitorIdsString.concat(String.format("[Id: %s, Type: %s, Origin: %s, Authentication: %s] ", id.getId(), id.getIdType(), id.getIdOrigin(), id.getAuthenticationState().toString()));
                            }
                        }
                        callbackContext.success(visitorIdsString);
                    }
                });
            }
        });
    }

    private void getUrlVariables(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                Identity.getUrlVariables(new AdobeCallback<String>() {
                    @Override
                    public void call(String urlVariables) {
                        callbackContext.success(urlVariables);
                    }
                });
            }
        });
    }

    private void syncIdentifier(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                String idType, idValue;
                int state;
                try {
                    idType = args.getString(0);
                    idValue = args.getString(1);
                    state = args.getInt(2);
                }catch (JSONException e) {
                    callbackContext.error(e.getMessage());
                    return;
                }
                Identity.syncIdentifier(idType, idValue, getAuthenticationState(state));
                callbackContext.success(String.format("Visitor ID synced: Id: %s, Type: %s, Authentication: %s] ", idType, idValue, getAuthenticationState(state).toString()));
            }
        });
    }

    private void syncIdentifiers(final JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                HashMap<String,String> ids;
                int state = 3;
                try {
                    ids = getStringMapFromJSON(args.getJSONObject(0));
                    if(!args.optString(1).equals("null")) {
                        state = args.getInt(1);
                    }
                }catch (JSONException e) {
                    e.printStackTrace();
                    callbackContext.error(e.getMessage());
                    return;
                }
                if(state < 3) {
                    Identity.syncIdentifiers(ids, getAuthenticationState(state));
                    callbackContext.success(String.format("Visitor IDs synced: %s and Authentication: %s] ", ids.toString(), getAuthenticationState(state).toString()));
                } else {
                    Identity.syncIdentifiers(ids);
                    callbackContext.success(String.format("Visitor IDs synced: %s] ", ids.toString()));
                }
            }
        });
    }

    // =====================
    // Helpers
    // =====================
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

    private VisitorID.AuthenticationState getAuthenticationState(final int authStateInt){
        if(authStateInt == 0) {
            return  VisitorID.AuthenticationState.UNKNOWN;
        } else if(authStateInt == 1) {
            return VisitorID.AuthenticationState.AUTHENTICATED;
        } else if(authStateInt == 2) {
            return VisitorID.AuthenticationState.LOGGED_OUT;
        } else {
            return null;
        }
    }
}
