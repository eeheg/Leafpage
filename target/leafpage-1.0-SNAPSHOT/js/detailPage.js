$(document).ready(function () {

    if (errorMsg === "리뷰 삭제에 실패했어요.") {
        alert(errorMsg);
    }
    if (failed === "리뷰 등록에 실패했어요.") {
        alert(failed);
    }

    /*emptyH을 클릭했을 때 fullH를 보여줌*/
    $("#emptyH").click(function(){
        $("#emptyH").hide();
        $("#fullH").show();
    });

    /*fullH를 클릭했을 때 emptyH을 보여줌*/
    $("#fullH").click(function(){
        $("#emptyH").show();
        $("#fullH").hide();
    });


    $(".tab-button > li").click(function () {
        var idx = $(this).index();

        $(this).addClass("on").siblings().removeClass("on");

        $(".tabmenu .tab-content")
            .eq(idx)
            .addClass("on")
            .siblings(".tab-content")
            .removeClass("on");
    });


//별점 표시
    $('.starRev span').click(function(){
        $(this).parent().children('span').removeClass('on');
        $(this).addClass('on').prevAll('span').addClass('on');
    });

    $('.stars .fa').click(function () {
        $(this).addClass('active')
        $(this).prevAll().addClass('active')
        $(this).nextAll().removeClass('active')

        let num = $(this).index()
        let starRate = num + 1

    });

    $("#reviewRegister").click(function () {

        var reviewContent = $('textarea[name="reviewContent"]').val();

        var selectedRating = $('.starRev span.on').length;

        console.log("리뷰 내용 : ", reviewContent, ", 별점 : ", selectedRating);

        if (reviewContent.trim() === '' || selectedRating === 0) {
            alert('리뷰 내용 또는 별점을 선택해주세요.');
        } else {
            $.ajax({
                type: 'POST',
                url: '/makeReview.do',
                data: {
                    rating: selectedRating,
                    content: reviewContent
                },
                success: function(response) {
                    if (failed) {
                        alert(failed);
                    } else {
                        alert('리뷰 등록에 성공했어요.');
                    }
                    location.reload();
                },
                error: function(error) {
                    alert('리뷰 등록에 실패했어요.' + error);
                }
            });
        }
    });

    $("#reviewClose").click(function () {

        $('textarea[name="reviewContent"]').val('');
        $('.starRev span.on').removeClass('on');

    });

    $('.rental').click(function () {
        let now = new Date();
        let scheduledReturnDate = new Date(now.setDate(now.getDate() + 7));

        let year = scheduledReturnDate.getFullYear();
        let month = scheduledReturnDate.getMonth() + 1;
        let date = scheduledReturnDate.getDate();

        $('.scheduled-return-date').text(`대여기한 : ${year}-${month}-${date}`);
    });

});

// 도서 대여
function rent(ISBN) {

    $.ajax({
        url: 'rentBook.do',
        type: 'post',
        dataType: 'text',
        contentType: "application/x-www-form-urlencoded",
        async: true,
        data: {ISBN: ISBN},

        success: function (data) {
            console.log(data);
            if (data === "overRentCount") {
                alert("회원의 도서 대여 수가 5권입니다. 더 이상 대여하실 수 없습니다.");
            } else if (data === "renting") {
                alert("현재 대여 중인 도서입니다.");
            } else {
                $('#rental').modal('show');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // 에러 처리 코드
            console.log('Error: ' + textStatus);
        }
    });
}