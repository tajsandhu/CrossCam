import React from 'react';
import { Auth } from 'aws-amplify';

//returns the current time and date in an date-month-year-hour:minute:second:milisecond format
export function getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    var second = new Date().getSeconds();
    var mili = new Date().getMilliseconds();
    return ''.concat(date, '-', month, '-', year, '-', hour, ':', minute, ':', second, ':', mili);
}

//returns the username of the currently logged in user
export async function getUserName() {
    try {
        const usr = await Auth.currentAuthenticatedUser();
        return usr['attributes']['email'];
    } catch (err) {
        return 'No Current User';
    }
}