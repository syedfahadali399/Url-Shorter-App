let form = document.getElementById("form")
let getUrl = document.getElementById("get-url-input")
let getUrlBtn = document.getElementById("shorten-btn")
let clearBtn = document.getElementById("clear-btn")
let showsUrl = document.getElementById("result-text")
let copyUrlBtn = document.getElementById("copy-btn")
let showUrlHistory = document.getElementById("history-list")
let toggleMode = document.getElementById("mode")
let section = document.getElementById("section")
let body = document.getElementById("body")
let createHistoryList = document.createElement("div")

let url_array = []
let api = "uBgmdCNHmGnuK3gZabDrG02TXoCGGDlpWIfnsdL2jOB61sHGu6F2hTAkLunH"

let showHistory = (url) => {

    let createElementA = document.createElement("a")
    
    if(url_array.includes(url)) {
        createElementA.textContent = `Url already exist`
        createElementA.href = null
    } else {
        createElementA.textContent = `${url}`
        createElementA.href = url
    }
    createElementA.target = "_blank"

    createHistoryList.classList.add("history-list")
    createHistoryList.appendChild(createElementA)
    showUrlHistory.insertAdjacentElement("beforeend", createHistoryList)

}

let showUrl = (shortUrl) => {

    showHistory(shortUrl)
    url_array.push(shortUrl)
    showsUrl.textContent = `${shortUrl}`
}

let fetchUrl = (userUrl) => {

    fetch(`https://api.tinyurl.com/create`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${api}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: `${userUrl}`
        })
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error("api limit is full")
        }
        return response.json()
    })
    .then((data) => {
        console.log(data.data.tiny_url);
        showUrl(data.data.tiny_url)
    })
    .catch((error) => {
        showsUrl.textContent = "Please enter a valid url"
        throw new Error("Failed to fetch data", error)
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let convertUrl = getUrl.value

    fetchUrl(convertUrl)
})

copyUrlBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if(showsUrl.textContent === "Your shortened URL will appear here") {
        copyUrlBtn.textContent = "Generate url first"
        copyUrlBtn.style.width = "100%"
    } else {
        copyUrlBtn.textContent = "Copied"
    }
    
    
    setTimeout(() => {
        copyUrlBtn.textContent = "Copy"
        copyUrlBtn.style.width = "65%"
    }, 2000)

    navigator.clipboard.writeText(showsUrl.textContent)
})

clearBtn.addEventListener("click", (e) => {
    e.preventDefault()

    getUrl.value = ""
    showsUrl.textContent = "Your shortened URL will appear here"

})

toggleMode.addEventListener("change", (e) => {
    e.preventDefault()

    if(e.target.checked) {
        body.classList.add("dark-mode")
        body.classList.remove("light-mode")
        section.style.backgroundColor = "black"
        section.style.color = "white"
        section.style.border = "3px solid white"
    } else {
        body.classList.add("light-mode")
        body.classList.remove("dark-mode")
        section.style.backgroundColor = "white"
        section.style.color = "black"
        section.style.border = "3px solid black"
    }
})