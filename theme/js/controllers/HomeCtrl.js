"use strict";

angular.module('wp')
  .controller('HomeCtrl', function ($rootScope, $scope, $sce, wpApiService) {
    $rootScope.viewportClass = "home-viewport";

    $rootScope.ogName = "";

    $scope.presentationLikeMentions = 1254;
    $scope.presentationInstagramFollowers = 328;
    $scope.presentationPartners = 11;

		$scope.rewardsHovered = true;

    $scope.imageLinkPartners = [
    	{
    		url: templateDirectory + '/img/partenaires/logo-atelierdecedric.png',
    		alt: 'Logo de Atelier de Cédric'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-barabulles.png',
    		alt: 'Logo de Barabulles'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-bda.png',
    		alt: 'Logo de BDA Daufine'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-bde.png',
    		alt: 'Logo de BDE Daufine'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-buspalladium.png',
    		alt: 'Logo de Bus Palladium'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-caramba.png',
    		alt: 'Logo de Caramba'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-crousculture.png',
    		alt: 'Logo de Crous Culture'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-daufine.png',
    		alt: 'Logo de Daufine'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-daufineartdays.png',
    		alt: 'Logo de Daufile Art Days'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-dm.png',
    		alt: 'Logo de DM'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-eicar.png',
    		alt: 'Logo de Eicar'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-emergenza.png',
    		alt: 'Logo de Emergenza'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-findspire.png',
    		alt: 'Logo de Findspire'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-giromela.png',
    		alt: 'Logo de Giromela'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-kkbb.png',
    		alt: 'Logo de Kiss Kiss Bang Bang'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-labaguetterie.png',
    		alt: 'Logo de La Baguetterie'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-ouifm.png',
    		alt: 'Logo de Oui FM'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-pssl.png',
    		alt: 'Logo de PSSL'
    	},
    	{
    		url: templateDirectory + '/img/partenaires/logo-studiobleu.png',
    		alt: 'Logo de Studio Bleu'
    	}
    ];

  });