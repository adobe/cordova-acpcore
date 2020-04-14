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
#import <ACPCore/ACPSignal.h>
#import <Cordova/CDV.h>
#import <Foundation/Foundation.h>

@interface ACPSignal_Cordova : CDVPlugin
- (void) extensionVersion:(CDVInvokedUrlCommand*)command;
@end

@implementation ACPSignal_Cordova

- (void) extensionVersion:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        NSString *version = [ACPSignal extensionVersion];

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:version];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end
