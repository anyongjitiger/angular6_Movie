module.exports = function () {
    var data = {
        products: [
            { id: 1, name: "Kayak", category: "Watersports", price: 275 },
            { id: 2, name: "Lifejacket", category: "Watersports", price: 48.95 },
            { id: 3, name: "Soccer Ball", category: "Soccer", price: 19.50 },
            { id: 4, name: "Corner Flags", category: "Soccer", price: 34.95 },
            { id: 5, name: "Stadium", category: "Soccer", price: 79500 },
            { id: 6, name: "Thinking Cap", category: "Chess", price: 16 },
            { id: 7, name: "Unsteady Chair", category: "Chess", price: 29.95 },
            { id: 8, name: "Human Chess Board", category: "Chess", price: 75 },
            { id: 9, name: "Bling Bling King", category: "Chess", price: 1200 }
        ],
        menus: [
            { id: 1, name: "Blue", link: "Watersports" },
            { id: 2, name: "1080p", link: "Watersports", subMenus: [
                    {id: 21, name: "movie", link: "Watersports"},
                    {id: 22, name: "TV", link: "Watersports"},
                    {id: 23, name: "show", link: "Watersports"}
                ] 
            },
            { id: 3, name: "720p", link: "Watersports" },
            { id: 4, name: "mp4", link: "Watersports" }
        ]
    }
    return data
}
