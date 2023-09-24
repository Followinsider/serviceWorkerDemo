if ('serviceWorker' in navigator) {
    // console.log('123');
    navigator.serviceWorker
        .register('/sw_cached_site.js')
        .then(e => console.log('注册成功', e))
        .catch(err => console.log(`报错, Error: ${err}`));
}