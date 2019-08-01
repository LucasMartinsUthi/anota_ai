app.controller('mainController', function ($scope, mainServ) {
    $scope.filmes = {};
    $scope.filmesCopy = {};

    $scope.init = function () { //função com meu evento
        angular.element(document).ready(function () {
            $stars = document.querySelectorAll('.fa-star')
            $stars.forEach(element => {
                element.addEventListener('mouseover', ()=>{
                    $scope.toggleStar(element)
                });
                element.addEventListener('mouseleave', ()=>{
                    $scope.toggleStar(element)
                });
                element.addEventListener('click', ()=>{
                    $parent = angular.element(element).parent()[0];
                    $parent.querySelectorAll('.fa-star').forEach(star => {
                        angular.element(star).addClass('locked')
                        $scope.rateFilm(element.getAttribute('data-star'), $parent.getAttribute('data-film'))
                    });
                });
            });
        });
    };

    $scope.deleteFilm =(index)=>{
        $scope.filmes.filmes.splice(index,1)
    };

    $scope.resetFilms =()=>{
        $scope.filmes = angular.copy($scope.filmesCopy);
    };

    $scope.rateFilm =(rating, index)=>{
        $scope.filmes.filmes[index].rating = rating;
    };

    $scope.toggleStar = (element) => {
        if(angular.element(element).hasClass('locked'))
            return false
        angular.element(element).toggleClass('fas far')
        $filmStars = angular.element(element).parent()[0].querySelectorAll('.fa-star');
        $filmStars.forEach(star => {
            if(star.getAttribute('data-star') < element.getAttribute('data-star')){
                angular.element(star).toggleClass('fas far')
            }
        });
    }

    mainServ.getDocuments(function(response){
        $scope.filmes = response;
        $scope.filmesCopy = angular.copy(response);
    });
});