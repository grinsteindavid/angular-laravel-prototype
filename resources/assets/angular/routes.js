app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider
    // HOME
    .state('/',{
      url: '/',
      views: {
        'navbar': {
          controller: 'generalController',
          templateUrl: '/angular/views/navbar.html'
        },
        'body': {
          templateUrl: '/angular/views/home.html'
        },
        'footer': {
          templateUrl: '/angular/views/footer.html'
        }
      }
    })
    // SOLUTIONS
    .state('solutions',{
      url: '/solutions',
      views: {
        'navbar': {
          controller: 'generalController',
          templateUrl: '/angular/views/navbar.html'
        },
        'body': {
          controller: 'solutionController',
          templateUrl: '/angular/views/solutions.html'
        },
        'footer': {
          templateUrl: '/angular/views/footer.html'
        }
      }
    })
    // SOLUTION
    .state('solution',{
      url: '/solution/{slug}',
      views: {
        'navbar': {
          controller: 'generalController',
          templateUrl: '/angular/views/navbar.html'
        },
        'body': {
          controller: 'solutionController',
          templateUrl: '/angular/views/show_solution.html'
        },
        'footer': {
          templateUrl: '/angular/views/footer.html'
        }
      }
    })
    // POST
    .state('post',{
      url: '/post/{slug}',
      views: {
        'navbar': {
          controller: 'generalController',
          templateUrl: '/angular/views/navbar.html'
        },
        'body': {
          controller: 'postController',
          templateUrl: '/angular/views/show_post.html'
        },
        'footer': {
          templateUrl: '/angular/views/footer.html'
        }
      }
    })
    // BLOG
    .state('blog',{
      url: '/blog',
      views: {
        'navbar': {
          controller: 'generalController',
          templateUrl: '/angular/views/navbar.html'
        },
        'body': {
          controller: 'blogController',
          templateUrl: '/angular/views/blog.html'
        },
        'footer': {
          templateUrl: '/angular/views/footer.html'
        }
      }
    })
    // DASHBOARD - LAYOUT
    .state('dashboard',{
      views: {
        'navbar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/navbar.html'
        },
        'body': {
          templateUrl: '/angular/views/dashboard/layout.html'
        }
      }
    })
    // DASHBOARD - PROFILE
    .state('dashboard.profile',{
      url: '/dashboard/profile',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'profileController',
          templateUrl: '/angular/views/dashboard/profile.html'
        }
      }
    })
    // DASHBOARD - GOOGLE MAPS
    .state('dashboard.gmaps',{
      url: '/dashboard/gmaps',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'googleMapController',
          templateUrl: '/angular/views/dashboard/googleMaps.html'
        }
      }
    })
    // DASHBOARD - ANNOUNCES
    .state('dashboard.announces',{
      url: '/dashboard/announces',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'announceController',
          templateUrl: '/angular/views/dashboard/announces.html'
        }
      }
    })
    // DASHBOARD - CREATE ANNOUNCE
    .state('dashboard.createannounce',{
      url: '/dashboard/announces/create',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'announceController',
          templateUrl: '/angular/views/dashboard/announce_create.html'
        }
      }
    })
    // DASHBOARD - EDIT ANNOUNCE
    .state('dashboard.editannounce',{
      url: '/dashboard/announces/{slug}/edit',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'announceController',
          templateUrl: '/angular/views/dashboard/announce_edit.html'
        }
      }
    })
    // DASHBOARD - POSTS
    .state('dashboard.posts',{
      url: '/dashboard/posts',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'postController',
          templateUrl: '/angular/views/dashboard/posts.html'
        }
      }
    })
    // DASHBOARD - CREATE POST
    .state('dashboard.createpost',{
      url: '/dashboard/posts/create',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'postController',
          templateUrl: '/angular/views/dashboard/post_create.html'
        }
      }
    })
    // DASHBOARD - EDIT POST
    .state('dashboard.editpost',{
      url: '/dashboard/posts/{slug}/edit',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'postController',
          templateUrl: '/angular/views/dashboard/post_edit.html'
        }
      }
    })
    // DASHBOARD - TAGS
    .state('dashboard.tags',{
      url: '/dashboard/tags',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'tagController',
          templateUrl: '/angular/views/dashboard/tags.html'
        }
      }
    })
    // DASHBOARD - INVENTORY
    .state('dashboard.inventory',{
      url: '/dashboard/inventory',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'inventoryController',
          templateUrl: '/angular/views/dashboard/inventory.html'
        }
      }
    })
    // DASHBOARD - CREATE SOLUTION
    .state('dashboard.createsolution',{
      url: '/dashboard/solutions/create',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'inventoryController',
          templateUrl: '/angular/views/dashboard/solution_create.html'
        }
      }
    })
    // DASHBOARD - EDIT SOLUTION
    .state('dashboard.editsolution',{
      url: '/dashboard/solutions/{slug}/edit',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'inventoryController',
          templateUrl: '/angular/views/dashboard/solution_edit.html'
        }
      }
    })
    // DASHBOARD - CATEGORIES
    .state('dashboard.categories',{
      url: '/dashboard/categories',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'tagController',
          templateUrl: '/angular/views/dashboard/categories.html'
        }
      }
    })
    // DASHBOARD - TESTIMONIALS
    .state('dashboard.testimonials',{
      url: '/dashboard/testimonials',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'testimonialRequestController',
          templateUrl: '/angular/views/dashboard/testimonials.html'
        }
      }
    })
    // DASHBOARD - TOOLS
    .state('dashboard.tools',{
      url: '/dashboard/tools',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'toolController',
          templateUrl: '/angular/views/dashboard/tools.html'
        }
      }
    })
    // DASHBOARD - CREATE ANNOUNCE
    .state('dashboard.createtool',{
      url: '/dashboard/tools/create',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'toolController',
          templateUrl: '/angular/views/dashboard/tool_create.html'
        }
      }
    })
    // DASHBOARD - EDIT TOOL
    .state('dashboard.edittool',{
      url: '/dashboard/tools/{slug}/edit',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'toolController',
          templateUrl: '/angular/views/dashboard/tool_edit.html'
        }
      }
    })
    // DASHBOARD - PROJECTS
    .state('dashboard.projects',{
      url: '/dashboard/projects',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'projectController',
          templateUrl: '/angular/views/dashboard/projects.html'
        }
      }
    })
    // DASHBOARD - CREATE PROJECT
    .state('dashboard.createproject',{
      url: '/dashboard/projects/create',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'projectController',
          templateUrl: '/angular/views/dashboard/project_create.html'
        }
      }
    })
    // DASHBOARD - EDIT PROJECT
    .state('dashboard.editproject',{
      url: '/dashboard/projects/{slug}/edit',
      parent: 'dashboard',
      views: {
        'sidebar': {
          controller: 'generalController',
          templateUrl: '/angular/views/dashboard/sidebar.html'
        },
        'body': {
          controller: 'projectController',
          templateUrl: '/angular/views/dashboard/project_edit.html'
        }
      }
    });
});
