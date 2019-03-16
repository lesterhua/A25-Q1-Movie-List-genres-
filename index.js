(function () {
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []
    const movieList = document.querySelector('#movie-list')
    const moviePanel = document.querySelector('#movie-panel')
    const genreList = {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
    }

    //增加右側sidebar
    for (let i in genreList) {
        let genere = genreList[i]
        let genereList = `
                   <li class="border">
                        <a class="nav-link" href="#" data-toggle="pill" data-toggle="pill" role="tab" data-number="${[i]}">${genere}</a>
                    </li>
        `
        movieList.innerHTML += genereList
    }

    //取出api資料
    axios.get(INDEX_URL).then((response) => {
        data.push(...response.data.results)
        console.log(data)
        displayDataList(data)
    }).catch((err) => console.log(err))

    //變更genres, 顯示電影資訊
    function displayDataList(data) {
        let htmlContent = ''
        data.forEach(function (item, index) {
            let genereTag = ''
            for (let i in item.genres) {
                genereNum = genreList[item.genres[i]]
                genereTag += `
                <span class="badge badge-secondary">${genereNum}</span>
                `
            }

            htmlContent += `
            <div class="col-sm-6 col-md-3 col-12">
              <div class="card mb-2">
                   <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card  image cap">
                <div class="card-body movie-item-body">
                   <h5 class="card-title">${item.title}</h5>
                   ${genereTag} 
                </div>
             </div>
         </div> 
            `
        })
        moviePanel.innerHTML = htmlContent
    }

    //設定監聽器,判別為同類電影清單
    movieList.addEventListener('click', event => {
        if (event.target.matches('.nav-link')) {
            movieFilter(event.target.dataset.number)
            console.log(event.target.dataset.number)
        }
        function movieFilter(num) {
            let results = []
            results = data.filter(movie => movie.genres.includes(Number(num)))
            displayDataList(results)
        }

    })

})()
