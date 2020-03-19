const config = {
    development: {
        host: "https://stg.tosneaker.com",
        imgUrl: "http://static-stg.tosneaker.com",
        domain: "http://static-stg.tosneaker.com",
        qiniuUrl: "http://static-stg.tosneaker.com/image/appraisal/"
    },
    production: {
        host: "https://www.tosneaker.com",
        imgUrl: "http://static.tosneaker.com",
        domain: "http://static.tosneaker.com",
        qiniuUrl: "http://static-stg.tosneaker.com/image/appraisal/"
    }
};

export default config;
