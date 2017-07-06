function sendChristmasCountdownDailyEmail() {
  //Calculate dates
  var christmas = new Date();
  christmas.setMonth(11);
  christmas.setDate(25);
  var sysdate = new Date();
  //Updates year for countdown if it's between Christmas and New Years
  if (sysdate.getMonth() == 11 && sysdate.getDate() > 25) {
    christmas.setFullYear(sysdate.getFullYear() + 1);
  }
  var countdown = christmas - sysdate;
  var days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  var weeks = Math.floor(countdown / (1000 * 60 * 60 * 24 * 7));
  var weeksAndDays = days - (weeks * 7);
  
  //Prepare email content and text
  var text = 'There are only ' + days + ' days until Christmas!!!';
  var subject = 'Daily Christmas Countdown - ' + days + ' days until Christmas!';
  var message;
  var spreadSheet = SpreadsheetApp.getActiveSheet();
  var dataRange = spreadSheet.getDataRange();
  var data = dataRange.getValues();
  for (var i = 1; i < data.length; i++) {
    (function() {
      var row = data[i];
      var emailAddress = row[1];
      var name = row[0];
      //Prints out number of months until Christmas if it's the 25th
      if (sysdate.getDate() == 25 && sysdate.getMonth() != 11) {
        //But if there's one month until Christmas have to change the world "months" to singular
        if (sysdate.getMonth() != 10) {
          message = name + ',' + '\n\n' + text + '\n\n' + 'Or, only ' + christmas.getMonth()-sysdate.getMonth() + ' more months until Christmas!';
        } else {
          message = name + ',' + '\n\n' + text + '\n\n' + 'Or, only ' + christmas.getMonth()-sysdate.getMonth() + ' more month until Christmas!';
        }
      //Or it prints out the number of weeks and days until Christmas
      } else {
        //Checks to make sure it doesn't print out '0 weeks'
        if (weeks == 0) {
         message = name + ',' + '\n\n' + text;
        //Checks to make sure it doesn't print out '0 days'
        } else if (weeksAndDays == 0) {
         message = name + ',' + '\n\n' + text + '\n\n' + 'Or, there are ' + weeks + ' weeks until Christmas!';
        } else {
         message = name + ',' + '\n\n' + text + '\n\n' + 'Or, there are ' + weeks + ' weeks and ' + weeksAndDays + ' days until Christmas!';
        }
      }
      var options = {};
      options.name = "Christmas Countdown";
      options.htmlBody =  '<div style="width: 100%; height: 600px; background-color: #B0DFDF; border: 10px black;"><div style="float:left; padding: 2%; font-family: Forte; width: 65%"><span style = "font-size: 24px; color: #5270B4;">' + message + '</span></div><img src="http://images.clipartpanda.com/christmas-tree-clip-art-christmas-tree-clip-art-2.png" style="float:right; width: 35%; height: 50%;"></div>'
      MailApp.sendEmail(emailAddress, subject, "Error viewing HTML", options);
      })(i);
   }
}
