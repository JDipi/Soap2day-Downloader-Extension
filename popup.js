$(".clear").on("click", function(e) {
  $(".queue ol").empty()
  if ($(".emptyMsg").length) {
    $(".emptyMsg").show()
  } else {
    $(`
    <span class="emptyMsg">
    <h3>The queue is empty</h3>
    </span>
    `).insertBefore(".queue ol")
  }
  chrome.storage.sync.set({queue: []})
})

chrome.storage.sync.get(["queue"], (data) => {
  console.log(data.queue)
  if (data.queue.length === 0) {$(".emptyMsg").show(); return} 
  $(data.queue).each((i, el) => {
    $(`<li><a href=${el.url}>${el.name}</a></li>`).appendTo(".queue ol")
  })
})

chrome.runtime.onMessage.addListener((req, sender, res) => {
  console.log(req)
  if (req.action == "updateQueue") {
    $(".emptyMsg").hide()
    $(req.data).each((i, el) => {
      $(`<li><a href=${el.url}>${el.name}</a></li>`).appendTo(".queue ol")
    })
  }
})