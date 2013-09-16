drupal-angular-seed
===================

Seed project for Drupal fed angular apps.

INSTALLATION
------------

Drupal:

  1. Download the [Drupal Boilerplate](https://github.com/Lullabot/drupal-boilerplate). And download the latest Drupal release inside the _docroot_ folder.
  2. Set up a virtual host for `http://bck.example.org` (use your real hostname), and point it to `<path-to-boilerplate>/docroot`.
  3. Install Drupal normally by going to `http://bck.example.org/install.php`. Install the minimal profile.
  4. Download the **drupal-angular-seed** project inside the boilerplate.
  5. Set an alias for the modules in the boilerplate to the _default_ site.
  ```bash
  cd docroot/sites/default;
  ln -s ../../drupal-angular-seed/drupal modules;
  ```
  6. Download the dependencies for, and enable, the drupal\_angular\_seed\_* features modules. `drush en -y drupal_angular_seed_main drupal_angular_seed_news drupal_angular_seed_page drupal_angular_seed_tout`.
  7. Visit admin/structure/features and make sure the features are all reverted. `drush -y fra`.

AngularJS:

  1. Change the URL in angular/app/js/services.js to point to your Drupal install.
  2. Set up a virtual host for `http://frnt.example.org` (use your real hostname), and point it to `<path-to-boilerplate>/drupal-angular-seed/angular/app`.

FUN THINGS TO TRY
-----------------

  * Add a new page and menu item to the main menu
  * Add new touts in drupal_angular_seed_tout.admin.inc and add them into templates
  * Override template files for different content types (see angular/app/_partials/nodes/README.md)
  * Turn on the Drupal path module and add aliases to nodes
  * Create your own listing of content (see drupal_angular_seed_news.module)

NOTES
-----

The seed modules are not intended to be used as-is on your site. You can use https://drupal.org/project/ftools to put the features back into your database and then re-export from there.
