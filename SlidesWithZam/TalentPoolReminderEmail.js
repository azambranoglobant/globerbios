function TalentPoolReminderEmail(emailRecipients){

    var getEmailBody = function (){
        
        var line1 = "<div>";
        var line2 =  "<p>";
        var line3 =  "Hi, since you are now on the Talent Pool we would like to ask you that during this time you upload your CV into Glow, please use the attached template to do it. ";
        var line4 = "In order to upload it, go to <a href='https://glow.corp.globant.com/'>Glow</a>.";
        var line5 = "</p>";
        var line6 = "<p>Go to My Information</p>";
        var line7 = "<p>(click on MI if you are on the Homepage, or on your Profile picture anywhere else on the site)</p>";
        var line8 = "<img src='https://lh4.googleusercontent.com/01Gb54sOkqS3tMBI_hRYC_-91iyZrIJl3ApYY5RqJesscnTL7idP7RqSnSdVkIBGIso4O_AQospkPu9w2b3tNAId5hF_rXR7E2iOA9B2_aF265oHaeyZdbdLgu_D9lVRKZk0o6MN' />";
        var line9 = "<p>On the left side you'll see these options</p>";
        var line10 = "<img src='https://lh6.googleusercontent.com/txDhNlWpkTjtxx-i9WDFVcHDolb6Y1KflzOInYhpeJSd4E4RW5xZgGLGE_-mJNuHOEjw8_O8ubtmWTJb2FU06ooArna44QtKlwHh8Vq7eP-w1BM8OFnx8YjVJcHr0VRdl_0PWfex' />";
        var line11 = "<p>Click on Upload Resume and attach the file with your CV</p>";
        var line12 = "<p>If you already uploaded it, please make sure it is up to date and on the standard format for Globant.</p>";
        var line13 = "<p>In addition, please complete your Bios, which will be presented to the client when exists an opportunity fits for you.</p>";
        var line14 = "<p>You must use this <a href='https://docs.google.com/a/globant.com/forms/d/e/1FAIpQLSeHXnIvdbmvMdiWIHXjGkqBU4ic15cl83enFnXc75DhHmuFrw/viewform'>form</a>";
        var line15 = " to complete it and <a href='https://drive.google.com/open?id=1_wDieWtaP8H0Dlw6-whCMe3pS1VObXPC8ocIPCuZ294'>here</a> you can see an example of how the summary should look after you're finished.</p>";
        var line16 = "<p>Regards</p>";
        var line17 = "</div>";

        return line1 + line2 + line3 + line4 + line5 + line6 + line7 + line8 + line9 + line10 + line11 + line12 + line13 + line14 + line15 + line16 + line17;
    }

    this.send = function(){
        var emailBody = getEmailBody();

        MailApp.sendEmail({
            to: emailRecipients,
            subject: "[Request Info] CV & Bios",
            htmlBody: emailBody
        });
    }
}