const Imagen = async() => {
    const apiKey = '5ZhAzlaEgmrdHaM5IO4oN0V2OCNi5D6p';
    const res = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);
    const {data} = await res.json();
    const {url} = data.images.original;
            const img = document.createElement('img');
            img.src = url;
            document.body.append(img);
  }
  
  Imagen()