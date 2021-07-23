exports.defineAutoTests = function() {
    // ACPCore tests
    describe('(ACPCore.extensionVersion)', function() {
        it('should exist', function() {
            expect(ACPCore.extensionVersion).toBeDefined();
        });
        it('should be a function', function() {
            expect(typeof ACPCore.extensionVersion === "function").toBe(true);
        });
        it('check if the result is a string', function(done) {
            ACPCore.extensionVersion(function(result) {
                expect(typeof result === "string").toBe(true);
                done();
            }, function() {});
        })
    });

    describe('(ACPCore.dispatchEvent)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        var e1 = ACPCore.createEvent("eventName", "eventType", "eventSource", {
            "key": "value"
        });
        it('should print log to console stating success is not function', function() {
            ACPCore.dispatchEvent(e1, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.dispatchEvent(e1, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.dispatchEventWithResponseCallback)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        var e1 = ACPCore.createEvent("eventName", "eventType", "eventSource", {
            "key": "value"
        });
        it('should print log to console stating success is not function', function() {
            ACPCore.dispatchEventWithResponseCallback(e1, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.dispatchEventWithResponseCallback(e1, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.dispatchResponseEvent)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        var e1 = ACPCore.createEvent("eventName", "eventType", "eventSource", {
            "key": "value"
        });
        var e2 = ACPCore.createEvent("eventName2", "eventType", "eventSource", {
            "key": "value"
        });
        it('should print log to console stating success is not function', function() {
            ACPCore.dispatchResponseEvent(e1, e2, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.dispatchResponseEvent(e1, e2, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.downloadRules)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.downloadRules("success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.downloadRules(function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.getPrivacyStatus)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.getPrivacyStatus("success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.getPrivacyStatus(function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        it('check if the result is a number', function(done) {
            ACPCore.getPrivacyStatus(function(result) {
                expect(typeof result === "number").toBe(true);
                done();
            }, function() {});
        })
    });

    describe('(ACPCore.getSdkIdentities)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.getSdkIdentities("success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.getSdkIdentities(function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        it('check if the result is a string', function(done) {
            ACPCore.getSdkIdentities(function(result) {
                expect(typeof result === "string").toBe(true);
                done();
            }, function() {});
        })
    });

    describe('(ACPCore.setAdvertisingIdentifier)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.setAdvertisingIdentifier("adid", "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.setAdvertisingIdentifier("adid", function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.setLogLevel)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.setLogLevel(3, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.setLogLevel(3, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.setPrivacyStatus)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.setPrivacyStatus(0, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.setPrivacyStatus(0, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.trackAction)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.trackAction("cordovaAction", {
                "cordovaKey": "cordovaValue"
            }, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.trackAction("cordovaAction", {
                "cordovaKey": "cordovaValue"
            }, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.trackState)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.trackState("cordovaAction", {
                "cordovaKey": "cordovaValue"
            }, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.trackState("cordovaAction", {
                "cordovaKey": "cordovaValue"
            }, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPCore.updateConfiguration)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPCore.updateConfiguration({
                "newConfigKey": "newConfigValue"
            }, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPCore.updateConfiguration({
                "newConfigKey": "newConfigValue"
            }, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        })
    });

    // ACPIdentity tests
    describe('(ACPIdentity.extensionVersion)', function() {
        it('should exist', function() {
            expect(ACPIdentity.extensionVersion).toBeDefined();
        });
        it('should be a function', function() {
            expect(typeof ACPIdentity.extensionVersion === "function").toBe(true);
        });
        it('check if the result is a string', function(done) {
            ACPIdentity.extensionVersion(function(result) {
                expect(typeof result === "string").toBe(true);
                done();
            }, function() {});
        })
    });

    // result verification is commented out because context is not set for the Identity tests (Identity - Failed to append Visitor information to URL (Context must be set before calling SDK methods))
    describe('(ACPIdentity.appendVisitorInfoForUrl)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPIdentity.appendVisitorInfoForUrl("https://example.com", "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPIdentity.appendVisitorInfoForUrl("https://example.com", function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        // it('check if the result is a string', function(done) {
        //     ACPIdentity.appendVisitorInfoForUrl("https://example.com", function(result) {
        //         expect(typeof result === "string").toBe(true);
        //         done();
        //     }, function() {});
        // })
    });

    // result verification is commented out because context is not set for the Identity tests (Identity - Failed to get Experience Cloud ID(Context must be set before calling SDK methods)
    describe('(ACPIdentity.getExperienceCloudId)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPIdentity.getExperienceCloudId("success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPIdentity.getExperienceCloudId(function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        // it('check if the result is a string', function(done) {
        //     ACPIdentity.getExperienceCloudId(function(result) {
        //         expect(typeof result === "string").toBe(true);
        //         done();
        //     }, function() {});
        // })
    });

    // result verification is commented out because context is not set for the Identity tests
    describe('(ACPIdentity.getUrlVariables)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPIdentity.getUrlVariables("success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPIdentity.getUrlVariables(function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        // it('check if the result is a string', function(done) {
        //     ACPIdentity.getUrlVariables(function(result) {
        //         expect(typeof result === "string").toBe(true);
        //         done();
        //     }, function() {});
        // })
    });

    // result verification is commented out because context is not set for the Identity tests
    describe('(ACPIdentity.syncIdentifier)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPIdentity.syncIdentifier("id1", "value1", ACPIdentity.ACPMobileVisitorAuthenticationStateUnknown, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPIdentity.syncIdentifier("id1", "value1", ACPIdentity.ACPMobileVisitorAuthenticationStateUnknown, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        // it('check if the result is a string', function(done) {
        //     ACPIdentity.syncIdentifier("id1", "value1", ACPIdentity.ACPMobileVisitorAuthenticationStateUnknown, function(result) {
        //         expect(typeof result === "string").toBe(true);
        //         done();
        //     }, function() {});
        // })
    });

    // result verification is commented out because context is not set for the Identity tests
    describe('(ACPIdentity.getIdentifiers)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPIdentity.getIdentifiers("success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPIdentity.getIdentifiers(function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        // it('check if the result is a string', function(done) {
        //     ACPIdentity.getIdentifiers(function(result) {
        //         expect(typeof result === "string").toBe(true);
        //         done();
        //     }, function() {});
        // })
    });

    // result verification is commented out because context is not set for the Identity tests
    describe('(ACPIdentity.syncIdentifiersWithNoAuthState)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPIdentity.syncIdentifiers({
                "id2": "value2",
                "id3": "value3",
                "id4": "value4"
            }, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPIdentity.syncIdentifiers({
                "id2": "value2",
                "id3": "value3",
                "id4": "value4"
            }, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        // it('check if the result is a string', function(done) {
        //     ACPIdentity.syncIdentifiers({
        //         "id2": "value2",
        //         "id3": "value3",
        //         "id4": "value4"
        //     }, function(result) {
        //         expect(typeof result === "string").toBe(true);
        //         done();
        //     }, function() {});
        // })
    });

    // result verification is commented out because context is not set for the Identity tests
    describe('(ACPIdentity.syncIdentifiersWithAuthState)', function() {
        beforeEach(function() {
            spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function() {
            ACPIdentity.syncIdentifiers({
                "id2": "value2",
                "id3": "value3",
                "id4": "value4"
            }, ACPIdentity.ACPMobileVisitorAuthenticationStateAuthenticated, "success", function() {})
            expect(console.log).toHaveBeenCalled();
        });
        it('should print log to console stating error is not function', function() {
            ACPIdentity.syncIdentifiers({
                "id2": "value2",
                "id3": "value3",
                "id4": "value4"
            }, ACPIdentity.ACPMobileVisitorAuthenticationStateAuthenticated, function() {}, "error")
            expect(console.log).toHaveBeenCalled();
        });
        // it('check if the result is a string', function(done) {
        //     ACPIdentity.syncIdentifiers({
        //         "id2": "value2",
        //         "id3": "value3",
        //         "id4": "value4"
        //     }, ACPIdentity.ACPMobileVisitorAuthenticationStateAuthenticated, function(result) {
        //         expect(typeof result === "string").toBe(true);
        //         done();
        //     }, function() {});
        // })
    });

    // ACPLifecycle tests
    describe('(ACPLifecycle.extensionVersion)', function() {
        it('should exist', function() {
            expect(ACPLifecycle.extensionVersion).toBeDefined();
        });
        it('should be a function', function() {
            expect(typeof ACPLifecycle.extensionVersion === "function").toBe(true);
        });
        it('check if the result is a string', function(done) {
            ACPLifecycle.extensionVersion(function(result) {
                expect(typeof result === "string").toBe(true);
                done();
            }, function() {});
        })
    });
    // ACPSignal tests
    describe('(ACPSignal.extensionVersion)', function() {
        it('should exist', function() {
            expect(ACPSignal.extensionVersion).toBeDefined();
        });
        it('should be a function', function() {
            expect(typeof ACPSignal.extensionVersion === "function").toBe(true);
        });
        it('check if the result is a string', function(done) {
            ACPSignal.extensionVersion(function(result) {
                expect(typeof result === "string").toBe(true);
                done();
            }, function() {});
        })
    });
};