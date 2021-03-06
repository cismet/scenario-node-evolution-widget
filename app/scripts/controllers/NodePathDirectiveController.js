angular.module(
    'de.cismet.cids.widgets.nodePathWidget.controllers',
    []
).controller(
    'de.cismet.cids.widgets.nodePathWidget.controllers.NodePathDirectiveController',
    [
        '$scope',
        'de.cismet.collidingNameService.Nodes',
        function ($scope, Nodes) {
            'use strict';
            var i;
            $scope.selectedBreadCrumbIndex = 0;
            $scope.loadWorldstate = function (index) {
                $scope.selectedBreadCrumbIndex = index;
                $scope.selectedNode = $scope.breadCrumbPath[index];
            };
            $scope.isActive = function (index) {
                return index === $scope.selectedBreadCrumbIndex ? 'active' : '';
            };
            $scope.breadCrumbPath = [];
            $scope.$watch('inputNode', function () {
                //FIXME WE need a proper way to get the node corresponding to the Worldstate
                if ($scope.inputNode && $scope.inputNode.key) {
                    var splittedLink = $scope.inputNode.key.split('.');
                    //can we use the splittetLink array to retrive the single nodes??
                    var nodeKey = '';
                    $scope.breadCrumbPath.splice(0, $scope.breadCrumbPath.length);
                    for (i = 0; i < splittedLink.length; i++) {
                        nodeKey = nodeKey + splittedLink[i];
                        $scope.breadCrumbPath.push(Nodes.get({nodeId: Nodes.utils.getRequestIdForNodeKey(nodeKey)}));
                        nodeKey = nodeKey + '.';
                    }
                    $scope.selectedBreadCrumbIndex = $scope.breadCrumbPath.length - 1;
                } else {
                    $scope.breadCrumbPath.splice(0, $scope.breadCrumbPath.length);
                }
            });
        }
    ]
);