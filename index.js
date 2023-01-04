const tocken = require('./tocken.js').tocken
const { query } = require('express')
const express = require('express')
const request = require('request')

const app = express()

function searchYT(query){
  console.log(query)
  
    }
    
    // console.log(tocken)
    
    
  app.get('/get_mp3_link/:yt_id', (req, res) => {
    let url = 'https://a.ceoc.cx/api/v1/init'
    let id = req.params.yt_id
    // let url = 'https://eeo.ceoc.cx/api/v1/convert?sig=NGN4gm5TgQWsoCYLGLAywq%2BuunzOQzA7hGblV7OF%2Fqn3mic%2FnRCHidWwkS3V9aGPgubluWnPlpdAWh%2FBq3c5yySARBdy59weV4GV0joggNj9RmDeFMD7hm8lF6zE7fCJaMkPLiYcVoaTIOcOFMhrWhW%2BL9CUhDsrdCYA14xv93Ro6L0XPo0msct124susLi%2BkgneXvQNQaApE%2F7BtC8aSMdqd3S%2BqmibkzHGeVQDFGJLSeB4yryEJ9ezT5nfF5hTJACXEXUlNGkuE6XbPUi8tYmNoBfi9IdWwFpMxfXUrY1fr8bB%2Fz1IBx%2FeTBwxq3KDQUT9zAp84OPBwW%2BdyhLzhA%3D%3D&v=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D'+req.params.yt_id+'&f=mp3&_=0.6675458957955672'
    var clientServerOptions = {
        uri: url,
        method: 'GET',
        header: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Origin': 'https://ytmp3.nu',
          'Connection': 'keep-alive',
          'Referer': 'https://ytmp3.nu/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site'
        }

          }
          request(clientServerOptions, function (error, response) {
            console.log(response.body)
            res.header({
              'Content-type': 'application/json' 
            })
            let redirectUrl = JSON.parse(response.body).convertURL+'&v=https://www.youtube.com/watch?v='+id+'&f=mp3'
            clientServerOptions.uri = redirectUrl
            request(clientServerOptions,function(error,response1){
              let urls = JSON.parse(response1.body) 
              // clientServerOptions.uri = decodeURI(urls.progressURL)
              clientServerOptions.uri = 'https://cco.ceeo.cc/api/v1/progress?sig=BgdbhnJOUjxUieYhVFvfMI6fQNnh9tE3FbVXTnFIVnuxY1bxt9U%2F7CBmbSl7TzkHfR0aXQDVyM9W7DpWAGc4iscUJGHMqflGVFU6hxnkjEQwqSiItLM3mTCCIwgX%2BvDjvi1JPO149TSt2ZMFVE%2FLP2OHIgcTbwyOsXTtqvjvj0lGdlaS4nPmJvbYNuOrQ2AB%2Fsb89IrOTksm1c4cDuE7l2Dg2ChFn1afOxhee2J%2BEQ4PEptfpxahwvITi6YyxizIWX1XjShkY2eV1VUMVnWimfKl3%2B5yx44iXmkukNfMmg%2BcxP%2FnFki7pMFAp7qs6EM82iN4hq72N55kfoF%2FTyAKrw%3D%3D'
              // console.log(clientServerOptions.uri)
              clientServerOptions.header = {
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Host':'cee.ceeo.cc',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
                'Accept-Encoding':'gzip, deflate, br',
                'Sec-Fetch-Dest':'document',
                'Sec-Fetch-Mode':'navigate',
                'Sec-Fetch-Site':'none',
                'Sec-Fetch-User':'?1',
                'Upgrade-Insecure-Requests':'1',
                'Accept-Language':'en-US,en;q=0.5',
                'Connection':'keep-alive'
              }
              request(clientServerOptions, function(error,response2){
                  console.log(response2.body)
                  res.end(JSON.stringify({[id]:JSON.parse(response1.body)}))
                })
            })
            return
          });
  })
  app.get('/search_music/:query', (req, res) => {
  const url = 'https://youtube.googleapis.com/youtube/v3/search?q='+req.params.query+'&key='+tocken
  var clientServerOptions = {
    uri: url,
        method: 'GET',
        header: {
          'Authorization': 'Bearer '+tocken,
          'Accept': 'application/json' 
        },
      }
      request(clientServerOptions, function (error, response) {
        console.log(error,response.body)
        res.header({
          'Content-type': 'application/json' 
        })
        res.send(response.body)
        return
      });  
  })

// console.log(searchYT(url,tocken))
app.listen(5000)