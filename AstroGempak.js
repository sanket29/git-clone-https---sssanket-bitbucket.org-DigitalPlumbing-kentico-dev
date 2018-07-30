
$(document).ready(function () {
    console.log("ready!");
});



//$("#selectCat").change(function () {
//    alert("Handler for .change() called." +this.val);
//});

function myFunction() {
   

    var index = document.getElementById("selectCat").selectedIndex;
    var opt_Txt = document.getElementsByTagName("option")[index].text
    var opt_Val = document.getElementsByTagName("option")[index].value

    var res = opt_Val.split("@");
    if (res.length > 1) {
        AG_GayaHidup_Top_ChangeCategory(res[0], res[1]);
        document.getElementById("top_subheader").innerHTML = opt_Txt;
    }

    console.log("You selected: " + res[0]+" <--> "+ res[1]);
}

function AG_GayaHidup_Top_ChangeCategory(cat, val) { //cat=1 (get data from category) ; cat=2 (get data from tag)

    var pageNo = 1;
    var loadCount = 6;
    var startItem = 2;
    var endItem = 0;

    startItem = startItem + (loadCount * (pageNo - 1));
    endItem = startItem + (loadCount - 1);

    //var loadmoreUrl = 'http://dev-astrogempak.pink.cat/feeds?rss=1f58d8e0-a232-4687-9254-dcb1335198dc&minno=' + startItem + '&maxno=' + endItem;
    var loadmoreUrl = 'http://dev-astrogempak.pink.cat/Feeds/ArticleByCategory.aspx?rss=238f587f-8d7e-48b5-b015-9297c0e06871&cat=' + val + '&minno=' + startItem + '&maxno=' + endItem;
    if (cat == "t")//from tag
        loadmoreUrl = 'http://dev-astrogempak.pink.cat/Feeds/ArticleByTag.aspx?rss=400933a7-e11d-4159-ada1-5b06179ddbde&tag='+val+'&minno=' + startItem + '&maxno=' + endItem;

    var itemList = [];

    $.get(loadmoreUrl, function (data) {
        var $XML = $(data);
        var counter = 1;
        var itemTempt = '';

        $XML.find("item").each(function () {
            var item = {
                title: $(this).find("title").text(),
                description: $(this).find("description").text(),
                link: $(this).find("link").text(),
                pubDate: $(this).find("pubDate").attr("displayDate"),
                image: $(this).find("images").children("thumbnail").text(),
                section: $(this).find("categories").children("category").first().text(),
                tags: [],
                pageviews: $(this).find("viewcount").text()
            };

            $(this).find("tags").each(function (i, t) {
                $(t).find("tag").each(function (i, ti) {
                    var itemTag = {
                        tag: $(ti).text(),
                        tagLink: $(ti).attr("link")
                    };

                    item.tags.push(itemTag);
                });
            });

            itemList.push(item);
        });

        itemList.forEach(function (i) {
            //alert(i.title);
            if (counter == 1)
                itemTempt += '<div class="row">';

            itemTempt += '<div class="col-md-4"><div class="thumb-container">' +
            '<span class="tags">';

            i.tags.forEach(function (t) {
                if (t.tag != '') {
                    //alert(t.tag + ' | ' + t.tagLink);
                    itemTempt += '<a class="btn btn-info" href="' + t.tagLink + '">' + t.tag + '</a>';
                }
            });

            itemTempt += '</span>' +
            '<a href="' + i.link + '">' +
            '<img alt="' + i.title + '" class="img-responsive" src="' + i.image + '" />' +
            '</a>' +
            '<div class="secDates">' +
            '<div class="pull-left hidden-xs hidden-sm">' + i.section + '</div>' +
            '<div class="pull-right curved-panelA">' +
            '<span class="eye-icon"><i aria-hidden="true" class="fa fa-eye"></i></span>' +
            '<span class="viewsDat">' + i.pageviews + '</span>' +
            '<span class="dateDat">' + i.pubDate + '</span>' +
            '</div></div>' +
            '<div class="text-container">' +
            '<a href="' + i.link + '">' +
            '<h3>' + i.title + '</h3>' +
            '<p>' + i.description + ' </p>' +
            '</a>' +
            '<section>' +
            '<div class="shareBtnList">' +
            '<div class="addthis_sharing_toolbox" data-url="' + i.link + '" data-title="' + i.title + '" data-description="' + i.description + '"></div>' +
            '</div></section></div></div></div>';

           

            if (counter % 3 == 0)
                itemTempt += '</div><div class="row">';

            //if (counter == 3) {
            //    itemTempt += '<div class="col-md-4">'+
            //                '<div class="rectMedAds hidden-xs">'+
            //                  '<div id="div-gpt-ad-1364372587726-0" style="width:300px; height:250px; margin:0 auto;">'+
            //                    '<script type="text/javascript">'+
            //                      'googletag.display("div-gpt-ad-1364372587726-0");'+
            //                            '</script>'+
            //                          '</div>'+
            //                        '</div><!-- /.rectMedAds -->'+
            //                      '</div>';
            //    }


            if (counter == itemList.length)
                itemTempt += '</div>';

            counter++;
        });

        $("#ag_top_container").empty();
        $('#ag_top_container').append(itemTempt);
        addthis.layers.refresh();

        //if (itemList.length < 6) {
        //    //alert(itemList.length);
        //    $('#LoadMoreBtn').hide();
        //}
        //else {
        //    $('#LoadMoreBtn').attr('onclick', 'LoadMore(' + (pageNo + 1) + ');');
        //}
    });
}