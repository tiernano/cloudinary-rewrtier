const OLD_URL = 'https://res.cloudinary.com/tiernanotoole/';
const NEW_URL = 'https://images.tiernanotoole.ie/';

async function handleRequest(req) {
  const res = await fetch(req);
  const contentType = res.headers.get('Content-Type');
  

  // If the response is HTML, it can be transformed with
  // HTMLRewriter -- otherwise, it should pass through
  if (contentType.startsWith('text/html')) {
       var oldText = await res.text();

       let newText = oldText.replaceAll(OLD_URL, NEW_URL);
      
       let newRes = new Response(newText, {
            status: 200,
            headers: res.headers
          }
       )

       return newRes;
    //return rewriter.transform(res);
  } else {
    return res;
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});