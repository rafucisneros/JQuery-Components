const express = require('express')
const bodyParser = require('body-parser')
const app = express()


let testArray = 
[{"id":1,"first_name":"Ingamar","last_name":"Burbank","email":"iburbank0@businesswire.com","gender":"Male","ip_address":"190.255.32.129"},
{"id":2,"first_name":"Theodosia","last_name":"Deeney","email":"tdeeney1@google.ru","gender":"Female","ip_address":"68.150.207.49"},
{"id":3,"first_name":"Libbey","last_name":"Ambrogi","email":"lambrogi2@bluehost.com","gender":"Female","ip_address":"129.168.110.97"},
{"id":4,"first_name":"Bonni","last_name":"Crannach","email":"bcrannach3@tripadvisor.com","gender":"Female","ip_address":"151.62.157.129"},
{"id":5,"first_name":"Dolph","last_name":"Lente","email":"dlente4@reference.com","gender":"Male","ip_address":"167.150.224.195"},
{"id":6,"first_name":"Renelle","last_name":"Deave","email":"rdeave5@blogspot.com","gender":"Female","ip_address":"191.71.228.179"},
{"id":7,"first_name":"Emerson","last_name":"McKimm","email":"emckimm6@state.tx.us","gender":"Male","ip_address":"3.169.201.20"},
{"id":8,"first_name":"Linet","last_name":"Spensley","email":"lspensley7@addthis.com","gender":"Female","ip_address":"102.165.232.244"},
{"id":9,"first_name":"Lonnard","last_name":"Strawbridge","email":"lstrawbridge8@admin.ch","gender":"Male","ip_address":"63.10.169.8"},
{"id":10,"first_name":"Gerianne","last_name":"Visick","email":"gvisick9@ed.gov","gender":"Female","ip_address":"77.55.2.228"},
{"id":11,"first_name":"Chandler","last_name":"Tighe","email":"ctighea@example.com","gender":"Male","ip_address":"72.35.206.209"},
{"id":12,"first_name":"Wade","last_name":"Lakes","email":"wlakesb@mediafire.com","gender":"Male","ip_address":"163.231.15.137"},
{"id":13,"first_name":"Lamont","last_name":"Reddle","email":"lreddlec@cnn.com","gender":"Male","ip_address":"117.177.5.229"},
{"id":14,"first_name":"Carmelita","last_name":"Arghent","email":"carghentd@paginegialle.it","gender":"Female","ip_address":"81.169.74.150"},
{"id":15,"first_name":"Sibyl","last_name":"Cleere","email":"scleeree@ftc.gov","gender":"Female","ip_address":"250.140.240.2"},
{"id":16,"first_name":"Sutton","last_name":"Arnson","email":"sarnsonf@seesaa.net","gender":"Male","ip_address":"223.73.86.3"},
{"id":17,"first_name":"Kakalina","last_name":"Lewsey","email":"klewseyg@msu.edu","gender":"Female","ip_address":"45.159.91.10"},
{"id":18,"first_name":"Cullan","last_name":"Deaville","email":"cdeavilleh@surveymonkey.com","gender":"Male","ip_address":"150.191.128.78"},
{"id":19,"first_name":"Selma","last_name":"Beggini","email":"sbegginii@github.com","gender":"Female","ip_address":"146.222.104.239"},
{"id":20,"first_name":"Fredric","last_name":"Seatter","email":"fseatterj@networkadvertising.org","gender":"Male","ip_address":"207.235.221.83"},
{"id":21,"first_name":"Jakob","last_name":"Friary","email":"jfriaryk@phoca.cz","gender":"Male","ip_address":"143.127.70.132"},
{"id":22,"first_name":"Alisha","last_name":"Isoldi","email":"aisoldil@dion.ne.jp","gender":"Female","ip_address":"117.75.235.177"},
{"id":23,"first_name":"Katinka","last_name":"Scrauniage","email":"kscrauniagem@bloomberg.com","gender":"Female","ip_address":"247.67.16.120"},
{"id":24,"first_name":"Irma","last_name":"Ionnisian","email":"iionnisiann@constantcontact.com","gender":"Female","ip_address":"0.215.127.74"},
{"id":25,"first_name":"Claudio","last_name":"Sims","email":"csimso@wix.com","gender":"Male","ip_address":"73.118.14.77"},
{"id":26,"first_name":"Chelsey","last_name":"Fasse","email":"cfassep@xrea.com","gender":"Female","ip_address":"188.19.74.167"},
{"id":27,"first_name":"Winn","last_name":"Goggins","email":"wgogginsq@hud.gov","gender":"Male","ip_address":"113.51.205.180"},
{"id":28,"first_name":"Zeke","last_name":"Anwell","email":"zanwellr@google.com.hk","gender":"Male","ip_address":"88.191.10.81"},
{"id":29,"first_name":"Dodie","last_name":"Crielly","email":"dcriellys@marketwatch.com","gender":"Female","ip_address":"107.121.95.10"},
{"id":30,"first_name":"Gorden","last_name":"Bows","email":"gbowst@gravatar.com","gender":"Male","ip_address":"33.199.85.113"},
{"id":31,"first_name":"Ainsley","last_name":"Magor","email":"amagoru@dyndns.org","gender":"Female","ip_address":"132.188.94.241"},
{"id":32,"first_name":"Manny","last_name":"Costanza","email":"mcostanzav@disqus.com","gender":"Male","ip_address":"208.188.221.122"},
{"id":33,"first_name":"Bev","last_name":"Smither","email":"bsmitherw@altervista.org","gender":"Male","ip_address":"132.45.134.92"},
{"id":34,"first_name":"Jarrod","last_name":"D'Oyly","email":"jdoylyx@nytimes.com","gender":"Male","ip_address":"71.97.52.24"},
{"id":35,"first_name":"Pietra","last_name":"Gorsse","email":"pgorssey@umich.edu","gender":"Female","ip_address":"40.196.156.202"},
{"id":36,"first_name":"Valdemar","last_name":"Sorrill","email":"vsorrillz@quantcast.com","gender":"Male","ip_address":"3.255.231.31"},
{"id":37,"first_name":"Ailis","last_name":"Biaggiotti","email":"abiaggiotti10@infoseek.co.jp","gender":"Female","ip_address":"112.244.62.165"},
{"id":38,"first_name":"Heloise","last_name":"Whittuck","email":"hwhittuck11@typepad.com","gender":"Female","ip_address":"249.124.108.57"},
{"id":39,"first_name":"Hildegarde","last_name":"Connock","email":"hconnock12@mit.edu","gender":"Female","ip_address":"123.142.96.21"},
{"id":40,"first_name":"Stephani","last_name":"MacKill","email":"smackill13@i2i.jp","gender":"Female","ip_address":"75.97.137.116"},
{"id":41,"first_name":"Alric","last_name":"Pfiffer","email":"apfiffer14@vkontakte.ru","gender":"Male","ip_address":"136.119.85.205"},
{"id":42,"first_name":"Sashenka","last_name":"Collie","email":"scollie15@ca.gov","gender":"Female","ip_address":"231.162.119.249"},
{"id":43,"first_name":"Glynn","last_name":"Yitzhakov","email":"gyitzhakov16@telegraph.co.uk","gender":"Male","ip_address":"44.79.191.211"},
{"id":44,"first_name":"Patricio","last_name":"Premble","email":"ppremble17@mysql.com","gender":"Male","ip_address":"126.237.254.1"},
{"id":45,"first_name":"Mariele","last_name":"Bretelle","email":"mbretelle18@topsy.com","gender":"Female","ip_address":"62.168.74.34"},
{"id":46,"first_name":"Daffi","last_name":"Dumbellow","email":"ddumbellow19@booking.com","gender":"Female","ip_address":"25.48.167.231"},
{"id":47,"first_name":"Calypso","last_name":"Gritsaev","email":"cgritsaev1a@nps.gov","gender":"Female","ip_address":"219.67.107.33"},
{"id":48,"first_name":"Juline","last_name":"Parnaby","email":"jparnaby1b@latimes.com","gender":"Female","ip_address":"147.70.2.227"},
{"id":49,"first_name":"Yoshiko","last_name":"Nolli","email":"ynolli1c@toplist.cz","gender":"Female","ip_address":"63.114.240.67"},
{"id":50,"first_name":"Othelia","last_name":"Ladel","email":"oladel1d@ehow.com","gender":"Female","ip_address":"161.237.35.223"},
{"id":51,"first_name":"Sven","last_name":"Benes","email":"sbenes1e@hp.com","gender":"Male","ip_address":"65.181.72.48"},
{"id":52,"first_name":"Felice","last_name":"Busswell","email":"fbusswell1f@flickr.com","gender":"Female","ip_address":"105.163.67.141"},
{"id":53,"first_name":"Paddie","last_name":"Flook","email":"pflook1g@ft.com","gender":"Male","ip_address":"187.242.189.236"},
{"id":54,"first_name":"Ethelyn","last_name":"Grimoldby","email":"egrimoldby1h@bbc.co.uk","gender":"Female","ip_address":"61.73.30.57"},
{"id":55,"first_name":"Currie","last_name":"Timmes","email":"ctimmes1i@oaic.gov.au","gender":"Male","ip_address":"227.248.160.24"},
{"id":56,"first_name":"Thor","last_name":"Thurgood","email":"tthurgood1j@themeforest.net","gender":"Male","ip_address":"38.55.246.49"},
{"id":57,"first_name":"Genovera","last_name":"Surplice","email":"gsurplice1k@bandcamp.com","gender":"Female","ip_address":"175.103.202.181"},
{"id":58,"first_name":"Cristina","last_name":"Gaskamp","email":"cgaskamp1l@cam.ac.uk","gender":"Female","ip_address":"14.200.255.115"},
{"id":59,"first_name":"Nertie","last_name":"Gozzard","email":"ngozzard1m@bbb.org","gender":"Female","ip_address":"0.106.171.91"},
{"id":60,"first_name":"Waite","last_name":"Ekell","email":"wekell1n@ucoz.com","gender":"Male","ip_address":"40.135.139.140"},
{"id":61,"first_name":"Sheelah","last_name":"Hurton","email":"shurton1o@edublogs.org","gender":"Female","ip_address":"199.82.114.174"},
{"id":62,"first_name":"Edee","last_name":"Kisbee","email":"ekisbee1p@sun.com","gender":"Female","ip_address":"67.250.30.45"},
{"id":63,"first_name":"Kimmie","last_name":"Pilipyak","email":"kpilipyak1q@hatena.ne.jp","gender":"Female","ip_address":"38.189.96.251"},
{"id":64,"first_name":"Gar","last_name":"Higgoe","email":"ghiggoe1r@washingtonpost.com","gender":"Male","ip_address":"157.37.126.29"},
{"id":65,"first_name":"Kevin","last_name":"Justis","email":"kjustis1s@hubpages.com","gender":"Male","ip_address":"221.244.232.146"},
{"id":66,"first_name":"Darrick","last_name":"Seer","email":"dseer1t@prweb.com","gender":"Male","ip_address":"72.192.129.11"},
{"id":67,"first_name":"Regina","last_name":"Chazelas","email":"rchazelas1u@rakuten.co.jp","gender":"Female","ip_address":"16.26.221.134"},
{"id":68,"first_name":"Hagen","last_name":"Island","email":"hisland1v@spiegel.de","gender":"Male","ip_address":"82.108.121.215"},
{"id":69,"first_name":"Brianne","last_name":"Ivamy","email":"bivamy1w@hc360.com","gender":"Female","ip_address":"228.252.57.125"},
{"id":70,"first_name":"Peter","last_name":"Densie","email":"pdensie1x@comcast.net","gender":"Male","ip_address":"213.19.72.86"},
{"id":71,"first_name":"Millie","last_name":"Keig","email":"mkeig1y@ted.com","gender":"Female","ip_address":"154.189.37.201"},
{"id":72,"first_name":"Ives","last_name":"Cotesford","email":"icotesford1z@paypal.com","gender":"Male","ip_address":"192.9.30.161"},
{"id":73,"first_name":"Wynn","last_name":"Hablot","email":"whablot20@mail.ru","gender":"Male","ip_address":"183.54.84.61"},
{"id":74,"first_name":"Broddy","last_name":"Trulocke","email":"btrulocke21@wikia.com","gender":"Male","ip_address":"114.193.212.243"},
{"id":75,"first_name":"Henderson","last_name":"Cunradi","email":"hcunradi22@hubpages.com","gender":"Male","ip_address":"42.76.82.255"},
{"id":76,"first_name":"Marcille","last_name":"Bridywater","email":"mbridywater23@trellian.com","gender":"Female","ip_address":"22.6.123.80"},
{"id":77,"first_name":"Hendrika","last_name":"Loisi","email":"hloisi24@cbslocal.com","gender":"Female","ip_address":"104.40.205.81"},
{"id":78,"first_name":"Willy","last_name":"McCamish","email":"wmccamish25@php.net","gender":"Female","ip_address":"253.89.20.45"},
{"id":79,"first_name":"Yuri","last_name":"Keling","email":"ykeling26@google.com.au","gender":"Male","ip_address":"74.155.250.81"},
{"id":80,"first_name":"Rustie","last_name":"Newberry","email":"rnewberry27@godaddy.com","gender":"Male","ip_address":"56.35.98.205"},
{"id":81,"first_name":"Arabele","last_name":"Atkyns","email":"aatkyns28@uiuc.edu","gender":"Female","ip_address":"234.189.17.247"},
{"id":82,"first_name":"Hussein","last_name":"Turnock","email":"hturnock29@networkadvertising.org","gender":"Male","ip_address":"137.205.234.125"},
{"id":83,"first_name":"Merill","last_name":"Greschik","email":"mgreschik2a@cbc.ca","gender":"Male","ip_address":"212.110.210.191"},
{"id":84,"first_name":"Jule","last_name":"Dymidowicz","email":"jdymidowicz2b@springer.com","gender":"Male","ip_address":"248.33.47.47"},
{"id":85,"first_name":"Myer","last_name":"Cattroll","email":"mcattroll2c@slashdot.org","gender":"Male","ip_address":"242.204.14.3"},
{"id":86,"first_name":"Cosmo","last_name":"Berth","email":"cberth2d@soup.io","gender":"Male","ip_address":"137.220.190.253"},
{"id":87,"first_name":"Genna","last_name":"Keoghan","email":"gkeoghan2e@latimes.com","gender":"Female","ip_address":"141.105.225.17"},
{"id":88,"first_name":"Lizabeth","last_name":"Tomsen","email":"ltomsen2f@indiatimes.com","gender":"Female","ip_address":"169.251.54.7"},
{"id":89,"first_name":"Concordia","last_name":"Thacker","email":"cthacker2g@yale.edu","gender":"Female","ip_address":"242.68.53.254"},
{"id":90,"first_name":"Aprilette","last_name":"Birk","email":"abirk2h@jiathis.com","gender":"Female","ip_address":"151.234.222.81"},
{"id":91,"first_name":"Mohandis","last_name":"Denk","email":"mdenk2i@theguardian.com","gender":"Male","ip_address":"151.190.163.151"},
{"id":92,"first_name":"Greer","last_name":"Lovelace","email":"glovelace2j@delicious.com","gender":"Female","ip_address":"224.124.81.63"},
{"id":93,"first_name":"Lukas","last_name":"McElory","email":"lmcelory2k@globo.com","gender":"Male","ip_address":"43.133.38.111"},
{"id":94,"first_name":"Jilleen","last_name":"Grimwood","email":"jgrimwood2l@zdnet.com","gender":"Female","ip_address":"176.224.93.247"},
{"id":95,"first_name":"Grazia","last_name":"Sparrowhawk","email":"gsparrowhawk2m@odnoklassniki.ru","gender":"Female","ip_address":"1.209.195.56"},
{"id":96,"first_name":"Gaston","last_name":"Tidgewell","email":"gtidgewell2n@virginia.edu","gender":"Male","ip_address":"244.97.133.167"},
{"id":97,"first_name":"Willard","last_name":"Moro","email":"wmoro2o@newsvine.com","gender":"Male","ip_address":"104.188.220.117"},
{"id":98,"first_name":"Hale","last_name":"Kairns","email":"hkairns2p@columbia.edu","gender":"Male","ip_address":"135.232.67.233"},
{"id":99,"first_name":"Gregoire","last_name":"Davidai","email":"gdavidai2q@ibm.com","gender":"Male","ip_address":"193.250.152.234"},
{"id":100,"first_name":"Stafani","last_name":"Mcwhinnie","email":"smcwhinnie2r@skype.com","gender":"Female","ip_address":"173.245.99.108"},
{"id":101,"first_name":"Dory","last_name":"Dixsee","email":"ddixsee2s@zdnet.com","gender":"Male","ip_address":"118.38.211.105"},
{"id":102,"first_name":"Pippy","last_name":"Gauge","email":"pgauge2t@hp.com","gender":"Female","ip_address":"246.254.10.66"},
{"id":103,"first_name":"Carolan","last_name":"Imms","email":"cimms2u@lycos.com","gender":"Female","ip_address":"162.40.182.152"},
{"id":104,"first_name":"Pearla","last_name":"Degue","email":"pdegue2v@t.co","gender":"Female","ip_address":"246.120.46.38"},
{"id":105,"first_name":"Grove","last_name":"Dovidian","email":"gdovidian2w@canalblog.com","gender":"Male","ip_address":"255.107.79.126"},
{"id":106,"first_name":"Alexandrina","last_name":"Cuff","email":"acuff2x@china.com.cn","gender":"Female","ip_address":"72.160.137.236"},
{"id":107,"first_name":"Philippine","last_name":"Battersby","email":"pbattersby2y@t.co","gender":"Female","ip_address":"52.77.230.18"},
{"id":108,"first_name":"Brnaby","last_name":"Farr","email":"bfarr2z@networkadvertising.org","gender":"Male","ip_address":"95.81.120.159"},
{"id":109,"first_name":"Addi","last_name":"Ekkel","email":"aekkel30@timesonline.co.uk","gender":"Female","ip_address":"22.62.43.94"},
{"id":110,"first_name":"Humfrid","last_name":"Kew","email":"hkew31@qq.com","gender":"Male","ip_address":"59.68.188.121"},
{"id":111,"first_name":"Ania","last_name":"Bleue","email":"ableue32@icio.us","gender":"Female","ip_address":"58.198.66.44"},
{"id":112,"first_name":"Sally","last_name":"Terry","email":"sterry33@sfgate.com","gender":"Female","ip_address":"142.69.91.92"},
{"id":113,"first_name":"Beale","last_name":"Jouhandeau","email":"bjouhandeau34@tinypic.com","gender":"Male","ip_address":"109.108.60.128"},
{"id":114,"first_name":"Caddric","last_name":"Ridder","email":"cridder35@ucoz.ru","gender":"Male","ip_address":"242.33.37.129"},
{"id":115,"first_name":"Hi","last_name":"Yaakov","email":"hyaakov36@nbcnews.com","gender":"Male","ip_address":"225.218.81.205"},
{"id":116,"first_name":"Lambert","last_name":"Kemmer","email":"lkemmer37@biglobe.ne.jp","gender":"Male","ip_address":"251.169.138.123"},
{"id":117,"first_name":"Gannie","last_name":"Goodbody","email":"ggoodbody38@ocn.ne.jp","gender":"Male","ip_address":"219.220.132.187"},
{"id":118,"first_name":"Cordy","last_name":"Connelly","email":"cconnelly39@nbcnews.com","gender":"Female","ip_address":"197.200.57.141"},
{"id":119,"first_name":"Amil","last_name":"Duffield","email":"aduffield3a@instagram.com","gender":"Female","ip_address":"45.167.110.87"},
{"id":120,"first_name":"Evin","last_name":"Giacopini","email":"egiacopini3b@hugedomains.com","gender":"Male","ip_address":"205.7.57.213"}]

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static('public'))

app.get('/', (req, res)=>{
  console.log("")
  Object.keys(req.query).forEach(key=>console.log(key, req.query[key]))
  let array = testArray
  if(req.query["filterField"]){
    let field = req.query["filterField"]
    let value = req.query["filterValue"]
    console.log(`Filtrando por ${field} ${value}`)
    array = array.filter( function(row){
      if (row[field].toString().toLowerCase().search(value.toString().toLowerCase()) != -1) {
        return true
      } else {
        return false
      }
    })
  }
  if(req.query["sortField"]){
    var sortKey = req.query["sortField"]
    var sortDirection =  req.query["sortDirection"]
    console.log(`Ordenando por ${sortKey} ${sortDirection}`)

    array = array.sort((a,b)=>{
      if (sortDirection == "ASC"){ 
        // Orden Ascendente
        if( a[sortKey] < b[sortKey] ){
          return -1
        } else {
          return 1
        }
      } else {
        // Orden Descendente
        if( a[sortKey] > b[sortKey] ){
        return -1
        } else {
        return 1
        }
      }
    })


  }  
  let pageSize = req.query["pageSize"] ? parseInt(req.query["pageSize"]) : 5
  let count = array.length
  if(req.query["page"]){
    console.log(`Resquesting Page ${req.query["page"]}`)
    let start = (req.query["page"] - 1) * pageSize
    let end = start + pageSize
    console.log(start, end)
    array = array.slice(start, end)
  }
  res.json({data: array, pageCount: Math.ceil(count / pageSize)})
})

app.get('/cbo', (req, res)=>{
  res.json({"Opcion 1": "Opcion 1 html", "Opcion 2": "Opcion 2 html", "Opcion 3": "Opcion 3 html", 
  "Opcion 4": "Opcion 4 html", "Opcion 5": "Opcion 5 html"})
})


app.listen(3000, ()=>{
  console.log("Listening port 3000")
})