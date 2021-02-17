// importing the packages
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();


// the function for our application
app.get('/', function(req, res)
{
    //  localhost:8080/?q=the url
    let q = req.query.q;
    let q1 = q.replace("https://www.youtube.com/", "")
    var url = "https://socialblade.com/" + "youtube/" + q1;
    
    var header = 
    {
        "User-Agent" : 
        [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
            "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",

        ]
    }
    request({url, headers: header},
        // callback function
        function(error, response, html)
        {

            if(!error)
            {
                var $ = cheerio.load(html);
                
                // the main scraping part begins here
                var subscriber = $("#youtube-stats-header-subs").text();
                var channelName = $("#YouTubeUserTopInfoBlockTop > div:nth-child(1) > h1").text();
                var uploads = $("#youtube-stats-header-uploads").text();
                var avatarLink = $("#YouTubeUserTopInfoAvatar").attr("src");
                var countryCode = $("#youtube-user-page-country").text();
                var videoViews = $("#youtube-stats-header-views").text();



                var json = 
                {
                    "Name" : channelName,
                    "Subscriber" : subscriber,
                    "Uploads" : uploads,
                    "Avatar Link" : avatarLink,
                    "Country Code" : countryCode,
                    "Video Views" : videoViews,
                    "Channel Link" : q,


                };

                res.send(json);


            }

            


        }
    );







});


app.listen(process.env.PORT || 5000);
module.exports = app;
