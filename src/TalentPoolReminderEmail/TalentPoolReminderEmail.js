function TalentPoolReminderEmail(MailService){

    if(MailService !== undefined && (typeof MailApp !== 'undefined')) {
        MailService = MailApp;
    }

    var getEmailBody = function (){
        
        var body="";
        body += "<table style=\"background-color: #dedede;\" width=\"100%\">";
        body += "    <tr>";
        body += "        <td>";
        body += "            <table align=\"center\" width=\"600\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
        body += "                <tr>";
        body += "                  <td style=\"height: 30px; text-align: center;\">";
        body += "                <\/tr>";
        body += "                <tr>";
        body += "                    <td style=\"background-color: #CCD325; height: 70px; text-align: center;\" width=\"36\">";
        body += "                        <img src=\"https:\/\/ci6.googleusercontent.com\/proxy\/GJr0loqc4tkgf45gCaKGAugvdfCWrp-js_byIcxwmqjWGlymBkdDkYXr39Pe6a4DYRmnvvpmN9sltXP1vt43urS7uEi68MEUBTwdTHqgie2BvZfvtzuGPCldnw=s0-d-e1-ft#http:\/\/communications.globant.com\/\/Comm\/Kudos\/2017\/images\/Globant.png\"";
        body += "                            width=\"123\" height=\"21\" alt=\"\" class=\"CToWUd\">";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr bgcolor=\"#fff\">";
        body += "                    <td width=\"702\" valign=\"top\" bgcolor=\"#fff\" style=\"font-family:'Raleway',sans-serif;font-weight:400;font-size:16px;text-align:center;color:#666;padding:50px 30px 25px 20px;line-height:24px\">";
        body += "                        <span style=\"font-family:'Raleway',sans-serif;font-weight:700;color:#666;font-size:28px;text-align:left\">";
        body += "                          CV and Bio Reminder";
        body += "                        <\/span>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr bgcolor=\"#fff\">";
        body += "                    <td width=\"702\" valign=\"top\" bgcolor=\"#fff\" style=\"font-family:'Raleway',sans-serif;font-weight:400;font-size:16px;color:#666;padding:25px 30px 25px 20px;line-height:24px\">";
        body += "                        <span style=\"font-family:'Raleway',sans-serif; color:#666; padding:0px 30px; display:block; text-align:center; font-size:14px; font-weight:bold;\">";
        body += "                          Hi, since you are now on the Talent Pool, one of the priorities you must work on, is to update the information on your experience and skills, to make easier to find the right project for your next assignment. There are two tools for this: your CV and your Bio.";
        body += "                    <\/span>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr bgcolor=\"#fff\">";
        body += "                    <td width=\"702\" valign=\"top\" bgcolor=\"#fff\" style=\"font-family:'Raleway',sans-serif;font-weight:400;font-size:16px;color:#666;padding:25px 30px 25px 20px;line-height:24px\">";
        body += "                        <span style=\"font-family:'Raleway',sans-serif;color:#666; padding:0px 30px; display:block; text-align:center; font-size:14px; font-weight:bold;\">";
        body += "                          To upload your updated CV into Glow, please use the attached template to do it. In order to upload it, go to <a href='https:\/\/glow.corp.globant.com\/'>Glow<\/a>.";
        body += "                    <\/span>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr bgcolor=\"#fff\">";
        body += "                    <td width=\"702\" valign=\"top\" bgcolor=\"#fff\" style=\"font-family:'Raleway',sans-serif;font-weight:400;font-size:16px;text-align:center;color:#666;padding:20px 30px 20px 20px;line-height:24px\">";
        body += "                      <span style=\"font-family:'Raleway',sans-serif;font-weight:700;color:#666;font-size:14px;text-align:center\">";
        body += "                        Go to My Information ";
        body += "                      <\/span>";
        body += "                      <br>";
        body += "                      <span style=\"font-family:'Raleway',sans-serif;font-weight:700;color:#666;font-size:14px;text-align:center\">";
        body += "                        (click on MI if you are on the Homepage, or on your Profile picture anywhere else on the site)";
        body += "                      <\/span>";
        body += "                      <br \/>";
        body += "                      <img src='https:\/\/lh4.googleusercontent.com\/01Gb54sOkqS3tMBI_hRYC_-91iyZrIJl3ApYY5RqJesscnTL7idP7RqSnSdVkIBGIso4O_AQospkPu9w2b3tNAId5hF_rXR7E2iOA9B2_aF265oHaeyZdbdLgu_D9lVRKZk0o6MN' \/>";
        body += "                      <br \/>";
        body += "                      <span style=\"font-family:'Raleway',sans-serif;font-weight:700;color:#666;font-size:14px;text-align:center\">";
        body += "                        On the left side you'll see these options";
        body += "                      <\/span>";
        body += "                      <br \/>";
        body += "                      <br \/>";
        body += "                      <img src='https:\/\/lh6.googleusercontent.com\/txDhNlWpkTjtxx-i9WDFVcHDolb6Y1KflzOInYhpeJSd4E4RW5xZgGLGE_-mJNuHOEjw8_O8ubtmWTJb2FU06ooArna44QtKlwHh8Vq7eP-w1BM8OFnx8YjVJcHr0VRdl_0PWfex' \/>";
        body += "                      <br \/>";
        body += "                      <span style=\"font-family:'Raleway',sans-serif;font-weight:700;color:#666;font-size:14px;text-align:center\">";
        body += "                        Click on Upload Resume and attach the file with your CV.";
        body += "                      <\/span>";
        body += "                      <br \/>";
        body += "                      <span style=\"font-family:'Raleway',sans-serif;font-weight:700;color:#666;font-size:14px;text-align:center\">";
        body += "                        If you already uploaded it, please make sure it is up to date and uses Globant's standard format.";
        body += "                      <\/span>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr bgcolor=\"#fff\">";
        body += "                    <td width=\"702\" valign=\"top\" bgcolor=\"#fff\" style=\"font-family:'Raleway',sans-serif;font-weight:400;font-size:16px;color:#666;padding:20px 30px 25px 20px;line-height:24px\">";
        body += "                        <span style=\"font-family:'Raleway',sans-serif;color:#666; padding:0px 30px; display:block; text-align:center; font-size:14px; font-weight:bold;\">";
        body += "                    In addition, you must complete your Bio, which will be presented to the client when an opportunity seems a fit for your profile.";
        body += "                        You must use this <a href='https:\/\/docs.google.com\/a\/globant.com\/forms\/d\/e\/1FAIpQLSeHXnIvdbmvMdiWIHXjGkqBU4ic15cl83enFnXc75DhHmuFrw\/viewform'>form<\/a>  ";
        body += "                to complete it and <a href='https:\/\/drive.google.com\/open?id=1_wDieWtaP8H0Dlw6-whCMe3pS1VObXPC8ocIPCuZ294'>here<\/a> you can see an example of how the summary should look after you're finished.";
        body += "                    <\/span>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr bgcolor=\"#fff\">";
        body += "                    <td width=\"702\" valign=\"top\" bgcolor=\"#fff\" style=\"font-family:'Raleway',sans-serif;font-weight:400;font-size:16px;text-align:center;color:#666;padding:15px 30px 25px 20px;line-height:24px\">";
        body += "                        <span style=\"font-family:'Raleway',sans-serif;color:#666;text-align:center; font-size:14px; font-weight:bold;\">";
        body += "                    Regards";
        body += "                    <\/span>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr>";
        body += "                    <td width=\"773\" align=\"center\" style=\"font-family:Roboto Slab Normal,Verdana,Arial,Helvetica,sans-serif;color:#666666;font-size:10px;padding:5px 30px 5px 5px\">";
        body += "                        <span style=\"font-size:13px\"> Confidential Information | Do not forward or share outside Globant<\/span>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "                <tr>";
        body += "                    <td height=\"58\" colspan=\"2\" align=\"center\">";
        body += "                        <table width=\"439\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
        body += "                            <tbody>";
        body += "                                <tr>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=57078edca1&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3D57078edca1%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023198000&amp;usg=AFQjCNFb0mjiTRrwxYHiOl-TOPOGb1liSA\">";
        body += "                                        <img src=\"https:\/\/ci4.googleusercontent.com\/proxy\/eO1jQhQROP-2-giBIoDLWM4YOp5PWnDFcNiFHHyzAiEQOPRLLrVyJIgbXwME8tdvylA9Xaj7v2mD8_AglMnFeY1bX5X0CDo5ksAGN6t9XSuWkYBvhVPyRXARhOlIUN8FuP-rlwhP=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/facebook.png\"";
        body += "                                                border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=6ce675aa0f&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3D6ce675aa0f%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023198000&amp;usg=AFQjCNHp4WSgJSqSq7UVEGT9HYg_IPbMVA\"><img src=\"https:\/\/ci5.googleusercontent.com\/proxy\/uZ1qmfgFbHdQBweAjRlRp9AqvjdxUOC9OkNRcl9NVoutKI7fmiAIfLPR-K3vAo4d6fjukfd9uHBrvXIBVlgUr3DBlx55AnGFxSUvYMaYQxqCYL3x-8fZndcsgIwgVy25Wh46URk=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/twitter.png\"";
        body += "                                                border=\"0\" class=\"CToWUd\"><\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=e578f6775b&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3De578f6775b%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023198000&amp;usg=AFQjCNE6jA7Cy4QVgBvTDXkskcua4lpEKg\">";
        body += "                                        <img src=\"https:\/\/ci3.googleusercontent.com\/proxy\/nYRloc-qyGLuUYVHA6r5Tw9lXGxpkN5BuLvYlK7asKOQisvX2O0iyMYKZMU6FFZENxB17-8jfHl9Fv-3VeYe1N2l_AxW1QUeG7sYZYQncQIoCMxkJlypt3pmCGaTvIPxz5HIO7I=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/youtube.png\"";
        body += "                                                border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=8794ceef1c&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3D8794ceef1c%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023198000&amp;usg=AFQjCNFucDCoI1S8XGWMS7gL1VjY3yDWPQ\">";
        body += "                                        <img src=\"https:\/\/ci4.googleusercontent.com\/proxy\/XcExJKltiXPL_10Myku0MZ2VSPjf27s4JlGVhKjyDV16GsMRjer5KPNc1EtPmeOueOrkAH7OmDOb_8fO2rOUhPt3OMmN2tdsEcD3wSW1VRkz1mFW-AzXXaYoZbW903q8aiZWHpgi=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/linkedin.png\"";
        body += "                                                border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=d8757c5041&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3Dd8757c5041%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023199000&amp;usg=AFQjCNEe2BzgJGRzNBOUE0KxJ9sUFEnH_A\">";
        body += "                                        <img src=\"https:\/\/ci3.googleusercontent.com\/proxy\/6XbHEGGBTFZHwItkWk5wRywBPfAvWyjSgGUjqqKsfoJUUtyFRSiDUMrKDtDgdEK77QiM2p1BNYlmj52SBdV7Iu_-vscmY664TewQtLUcLUHpBtW0H8M7VzDLuzLH_dHAH207ejJbAA=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/pinterest.png\"";
        body += "                                                border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage1.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=4e14684d22&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage1.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3D4e14684d22%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023199000&amp;usg=AFQjCNGbHCVMYuxGsh1rr-H6eLS2g1wwFQ\">";
        body += "                                        <img src=\"https:\/\/ci5.googleusercontent.com\/proxy\/udrh-yJrQCkB-nYUS3dVrn2KA1pB2aH2EUanOMI5UbZ-A2Xhloyvlie4dvnavy1ScaIi4dT9PQU6kS4qaEbe30hhE13Pu98paaZO_G8qTrC5Oz-fbfjPKUYSyAnMtcq7Dw8=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/plus.png\"";
        body += "                                                alt=\"G+\" width=\"37\" height=\"37\" border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage1.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=002073a774&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage1.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3D002073a774%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023199000&amp;usg=AFQjCNFzLcjuBK_5_fbOt53uz21G21x0JQ\">";
        body += "                                        <img src=\"https:\/\/ci3.googleusercontent.com\/proxy\/n0y-l9PaHfWb4lHTGZQD7-xefAJs-MN2WIGjHDmsRifoenkbctNEe2p_C5rWr3_5cLxtt3eQJAP8zBHS_B8xBLuaScUkDNwjJaR8QahDTvfvBJhr8jHSkkPIakWtVDCLAChVE8xXTA=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/instagram.png\"";
        body += "                                                alt=\"instagram\" width=\"37\" height=\"37\" border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"51\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=345b2efaeb&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3D345b2efaeb%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023199000&amp;usg=AFQjCNHFtviW1Q09KZgee9t9hEg4hmt5Xg\">";
        body += "                                        <img src=\"https:\/\/ci6.googleusercontent.com\/proxy\/Od9kQ4sX0EKqRTnPrRyjEh-aKkTLLU_6lJV4fhZEWEXDYJzoM-PuYr0WdU2X5hyiUE8eIxuKRdlAwyEN0V6BX-5xLVAvwURGXMUbSniVuj_t3NCFJZrvcA-6w_KfAL9NfPX38bSOGXw=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/slideshare.png\"";
        body += "                                                alt=\"slideshare\" width=\"37\" height=\"37\" border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                    <td width=\"31\" height=\"36\">";
        body += "                                        <a href=\"http:\/\/globant.us4.list-manage.com\/track\/click?u=5831a121b939d20e0735e21a1&amp;id=1452e01eed&amp;e=60aab76c95\"";
        body += "                                            target=\"_blank\" data-saferedirecturl=\"https:\/\/www.google.com\/url?hl=en&amp;q=http:\/\/globant.us4.list-manage.com\/track\/click?u%3D5831a121b939d20e0735e21a1%26id%3D1452e01eed%26e%3D60aab76c95&amp;source=gmail&amp;ust=1489615023199000&amp;usg=AFQjCNGP76mB4dUJww__7KKGMaPIYgOvHQ\">";
        body += "                                        <img src=\"https:\/\/ci5.googleusercontent.com\/proxy\/vA696k1bdoMnW4xKSZdr-kyRSDTSq0S-UZxx8UfCB9Pn3cIvK5iWWPQ6GPmMs3rZ5FQTHjAC8o3Wiygv1lqCaaJGbx9DUkTgV2X7XPtWXVDxsPdMGHNsLEol4xVYMevxl2i2ydA=s0-d-e1-ft#http:\/\/communications.globant.com\/Comm\/Corporate\/2016\/footer\/images\/globant.png\"";
        body += "                                                border=\"0\" class=\"CToWUd\"> <\/a>";
        body += "                                    <\/td>";
        body += "                                <\/tr>";
        body += "                            <\/tbody>";
        body += "                        <\/table>";
        body += "                        <br>";
        body += "                        <span style=\"font-family:Roboto Slab Normal,Verdana,Arial,Helvetica,sans-serif;color:#666666;font-size:10px\">";
        body += "                            (c) 2017 Globant. All rights reserved.";
        body += "                        <\/span>";
        body += "                        <br>";
        body += "                        <br>";
        body += "                    <\/td>";
        body += "                <\/tr>";
        body += "            <\/table>";
        body += "        <\/td>";
        body += "    <\/tr>";
        body += "<\/table>";

        return body;
    }

    this.send = function(emailRecipients) {
        var emailBody = getEmailBody();

        MailService.sendEmail({
            to: emailRecipients,
            subject: "[Request Info] CV & Bios",
            htmlBody: emailBody
        });
    }
}

if((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = TalentPoolReminderEmail;
}