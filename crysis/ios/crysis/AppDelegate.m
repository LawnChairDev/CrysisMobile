/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "RCTPushNotificationManager.h"
#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;



  //[[RCTBundleURLProvider sharedSettings] setJsLocation:@"192.168.1.56"];

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  // [[RCTBundleURLProvider sharedSettings] setJsLocation:nil];
  // jsCodeLocation = [[RCTBundleURLProvider sharedSettings] setJsLocation:nil];



  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"crysis"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

-(void)application:(UIApplication *)application
didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
  {
    [RCTPushNotificationManager
    didRegisterUserNotificationSettings:notificationSettings];
  }

-(void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
  {
    [RCTPushNotificationManager
    didRegisterForRemoteNotificationsWithDeviceToken: deviceToken];
  }

-(void)application:(UIApplication *)application
didReceiveRemoteNotification:(NSDictionary *)notification
  {
    [RCTPushNotificationManager didReceiveRemoteNotification:notification];
  }

-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
  {
    [RCTPushNotificationManager didReceiveLocalNotification:notification];
  }

-(void)application:(UIApplication *)application
didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
  {
    NSLog(@"%@", error);
  }

@end
