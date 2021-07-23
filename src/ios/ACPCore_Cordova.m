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

#import <ACPCore/ACPCore.h>
#import <ACPCore/ACPExtensionEvent.h>
#import <Cordova/CDV.h>
#import <Foundation/Foundation.h>

@interface ACPCore_Cordova : CDVPlugin
- (void) dispatchEvent:(CDVInvokedUrlCommand*)command;
- (void) dispatchEventWithResponseCallback:(CDVInvokedUrlCommand*)command;
- (void) dispatchResponseEvent:(CDVInvokedUrlCommand*)command;
- (void) downloadRules:(CDVInvokedUrlCommand*)command;
- (void) extensionVersion:(CDVInvokedUrlCommand*)command;
- (void) getPrivacyStatus:(CDVInvokedUrlCommand*)command;
- (void) getSdkIdentities:(CDVInvokedUrlCommand*)command;
- (void) setAdvertisingIdentifier:(CDVInvokedUrlCommand*)command;
- (void) setLogLevel:(CDVInvokedUrlCommand*)command;
- (void) setPrivacyStatus:(CDVInvokedUrlCommand*)command;
- (void) trackAction:(CDVInvokedUrlCommand*)command;
- (void) trackState:(CDVInvokedUrlCommand*)command;
- (void) updateConfiguration:(CDVInvokedUrlCommand*)command;
@end

@implementation ACPCore_Cordova

- (void) dispatchEvent:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        NSDictionary *eventInput = [self getCommandArg:command.arguments[0]];
        if (![eventInput isKindOfClass:[NSDictionary class]]) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Unable to dispatch event. Input was malformed"] callbackId:command.callbackId];
        }

        ACPExtensionEvent *event = [self getExtensionEventFromJavascriptObject:eventInput];
        NSError *error = nil;
        [ACPCore dispatchEvent:event error:&error];

        if (error) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Error dispatching event: %@", error.localizedDescription ?: @"unknown error"]] callbackId:command.callbackId];
        }

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) dispatchEventWithResponseCallback:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        NSDictionary *eventInput = [self getCommandArg:command.arguments[0]];
        if (![eventInput isKindOfClass:[NSDictionary class]]) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Unable to dispatch event. Input was malformed"] callbackId:command.callbackId];
        }

        ACPExtensionEvent *event = [self getExtensionEventFromJavascriptObject:eventInput];
        NSError *error = nil;
        [ACPCore dispatchEventWithResponseCallback:event
                                  responseCallback:^(ACPExtensionEvent * _Nonnull responseEvent) {
            if (error) {
                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Error dispatching event: %@", error.localizedDescription ?: @"unknown error"]] callbackId:command.callbackId];
            }

            NSDictionary *response = [self getJavascriptDictionaryFromEvent:responseEvent];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
                                             error:&error];
    }];
}

- (void) dispatchResponseEvent:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        NSDictionary *inputResponseEvent = [self getCommandArg:command.arguments[0]];
        NSDictionary *inputRequestEvent = [self getCommandArg:command.arguments[1]];

        if (![inputRequestEvent isKindOfClass:[NSDictionary class]] || ![inputResponseEvent isKindOfClass:[NSDictionary class]]) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Unable to dispatch event. Input was malformed"] callbackId:command.callbackId];
        }

        ACPExtensionEvent *responseEvent = [self getExtensionEventFromJavascriptObject:inputResponseEvent];
        ACPExtensionEvent *requestEvent = [self getExtensionEventFromJavascriptObject:inputRequestEvent];
        NSError *error = nil;
        [ACPCore dispatchResponseEvent:responseEvent
                          requestEvent:requestEvent
                                 error:&error];

        if (error) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Error dispatching response event: %@", error.localizedDescription ?: @"unknown error"]] callbackId:command.callbackId];
        }

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) downloadRules:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [ACPCore downloadRules];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) extensionVersion:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        NSString *version = [ACPCore extensionVersion];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:version];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) getPrivacyStatus:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [ACPCore getPrivacyStatus:^(ACPMobilePrivacyStatus status) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsNSInteger:status];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];
    }];
}

- (void) getSdkIdentities:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [ACPCore getSdkIdentities:^(NSString * _Nullable content) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:content];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];
    }];
}

- (void) setAdvertisingIdentifier:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        NSString *newIdentifier = [self getCommandArg:command.arguments[0]];

        [ACPCore setAdvertisingIdentifier:newIdentifier];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) setLogLevel:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        ACPMobileLogLevel logLevel = (ACPMobileLogLevel)[[self getCommandArg:command.arguments[0]] intValue];

        [ACPCore setLogLevel:logLevel];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) setPrivacyStatus:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        ACPMobilePrivacyStatus privacyStatus = (ACPMobilePrivacyStatus)[[self getCommandArg:command.arguments[0]] intValue];

        [ACPCore setPrivacyStatus:privacyStatus];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) trackAction:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        id firstArg = [self getCommandArg:command.arguments[0]];
        id secondArg = [self getCommandArg:command.arguments[1]];

        // allows the ACPCore.trackAction(cData) call
        if([firstArg isKindOfClass:[NSDictionary class]]) {
            [ACPCore trackAction:nil data:firstArg];
        }
        else {
            [ACPCore trackAction:firstArg data:secondArg];
        }

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) trackState:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        id firstArg = [self getCommandArg:command.arguments[0]];
        id secondArg = [self getCommandArg:command.arguments[1]];

        // allows the ACPCore.trackState(cData) call
        if([firstArg isKindOfClass:[NSDictionary class]]) {
            [ACPCore trackState:nil data:firstArg];
        }
        else {
            [ACPCore trackState:firstArg data:secondArg];
        }

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) updateConfiguration:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        NSDictionary *config = [self getCommandArg:command.arguments[0]];

        [ACPCore updateConfiguration:config];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

// ===========================================================================
// helper functions
// ===========================================================================
- (ACPExtensionEvent *) getExtensionEventFromJavascriptObject:(NSDictionary *)event {
    NSError *error = nil;
    ACPExtensionEvent *newEvent = [ACPExtensionEvent extensionEventWithName:event[@"name"]
                                                                       type:event[@"type"]
                                                                     source:event[@"source"]
                                                                       data:event[@"data"]
                                                                      error:&error];
    if (error || !newEvent) {
        [ACPCore log:ACPMobileLogLevelWarning tag:@"ACPCore" message:[NSString stringWithFormat:@"Error creating ACPExtensionEvent: %@", error.localizedDescription ?: @"unknown"]];
    }

    return newEvent;
}

- (NSDictionary *) getJavascriptDictionaryFromEvent:(ACPExtensionEvent *)event {
    return @{
        @"name" : event.eventName,
        @"type" : event.eventType,
        @"source" : event.eventSource,
        @"data" : event.eventData
    };
}

- (id) getCommandArg:(id) argument {
    return argument == (id)[NSNull null] ? nil : argument;
}

@end
