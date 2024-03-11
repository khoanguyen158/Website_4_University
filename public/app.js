document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log);
}

angular
.module('myapp', [])
.controller('homeCtrl', function ($scope, $http){
    $scope.dsTinh = []

      $http.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json?fbclid=IwAR3iiCQLBU-anKX9WMYqyM0st9VfONutYweGeDzCPledyrAStlnGfPVzL3c').then(
            function (res) {//Thành công
                $scope.dsTinh = res.data
            },
            function (res) {//Thất bại

            }
        )
})

