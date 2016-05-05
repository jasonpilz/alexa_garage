//
//  ViewController.swift
//  AlexaGarage
//
//  Created by Jason Pilz on 2016-05-04.
//  Copyright © 2016 PilzArche. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func toggleGarageDoor(sender: AnyObject) {
        print("hit the garage button!")
        
        // Replace with actual particle device ID and particle API access Token
        let deviceID    = "12345678901234567890123456789"
        let accessToken = "1234567890qwertyuiopasdfghjklzxcvbnm"
        
        let request = NSMutableURLRequest(URL: NSURL(string: "https://api.particle.io/v1/devices/\(deviceID)/garage")!)
        let data    = "access_token=\(accessToken)&args=open"
        
        request.HTTPMethod = "POST"
        request.HTTPBody   = data.dataUsingEncoding(NSUTF8StringEncoding)
        
        // Create the connection and fire the request
        _ = NSURLConnection(request: request,
                            delegate: self,
                            startImmediately: true)
    }

}

