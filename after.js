// this code will be executed after page load
(function () {
  console.log("after.js executed");
  let tempQueue

  function addToQueue(data) {
    chrome.runtime.sendMessage({ action: "updateQueue", data });
    chrome.storage.sync.set({queue: data})
  }

  const $downloadBtn = /*html*/ `
    <a class="movie-dl label label-primary" title='Add ${
      $('.alert *[href="/movielist/"]').length ? "movie" : "TV series"
    } to download queue' data-contentType='${$('.alert *[href="/movielist/"]').length ? "movie" : "tv"}' style="margin: 0px 3px; display: flex; width: fit-content; position: absolute; left: 50%; transform: translate(-50%, 10px); z-index: 1000;">
      <svg width="21" height="21" viewBox="0 0 24 24" style="cursor: pointer; stroke: white;" fill="none" stroke="#8899a4" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path></svg>
    </a>
  `;

  const $downloadSeason = /*html*/ `
    <button class="downloadAll label label-info">Download Season</button>
  `;
  $($downloadBtn).insertAfter(".thumbnail a[onclick*=set]");

  $($downloadSeason).appendTo(".panel-body .row .alert-info-ex h4");
  $(".panel-body .row .alert-info-ex h4").css({
    width: "100%",
    display: "flex",
    "justify-content": "space-between",
  });
  
  $(".panel-body .row .alert-info-ex div.col-sm-12.col-lg-12")
  .children()
  .each((i, el) => {
    $(el).css({
      display: "flex",
      "align-items": "center",
      height: "fit-content",
    });
    $(/*html*/ `
      <a class="dlBtn" title='Add "${$(el).text()}" to download queue'>
        <svg width="21" height="21" viewBox="0 0 24 24" style="margin-right: 2px; cursor: pointer;" fill="none" stroke="#8899a4" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path></svg>
      </a>
      `).prependTo($(el));
    });
    
    
    $('.movie-dl').on('click', function() {
      chrome.storage.sync.get(["queue"], (data) => {
        console.log(data)
        tempQueue = data.queue || []
        if($(this).attr("data-contentType") == "tv") {
          $(".dlBtn").each((i, el) => {
            tempQueue = [...tempQueue, {url: $(el).next().attr('href'), name: $(el).next().text()}]
          })
          console.log(tempQueue)
          addToQueue(tempQueue)
        }
      })
    })

})();
