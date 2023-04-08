user = "skidraw400";
function display_projects() {
    parent = document.getElementById("project-parent");
    repo_list_url = "https://api.github.com/users/" + user + "/repos";
    let repos = [];
    fetch(repo_list_url)
        .then(res => res.clone().text())
        .then(text => {
            response = JSON.parse(text);
            // console.log(response);
            for (let x in response) {
                repos.push(response[x]["full_name"]);
            }
            repos.forEach(element => {
                console.log(element);
                fetch("https://raw.githubusercontent.com/" + element + "/main/README.md")
                    .then(res => res.clone().text())
                    .then(text => {
                        to_insert =  `
                        <div class="col">
                            <div class="card mt-3">
                                <div class="card-header"> <h2> <a href="https://github.com/` + element + `" target="_blank">` + element + `</a> </h2> </div>
                                <div class="card-body markdown">
                                    <p class=card-text>`;
                        text = text.replaceAll("## ", "### ").replaceAll("# ", "### ");
                        html_content = marked.parse(text);
                        element = document.getElementById("featuredMD");
                        to_insert += html_content;
                        to_insert += `</p></div> </div> </div>`;
                        parent.innerHTML += to_insert;
                    })

            });
            parent.innerHTML += "</div> </div>";
        })
}