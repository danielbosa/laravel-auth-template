<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Installazione Laravel

```bash
cd your parent_folder_path

#con laravel installer
laravel new your_project_name_here

#per versione 9
composer create-project --prefer-dist laravel/laravel:^10.0 your_project_name_here

cd your_project_name_here

code . -r

php artisan serve

ctrl + c

```
## Configurazione Laravel
```bash
npm remove postcss

#installo dbal per migration e seeder
composer require doctrine/dbal

composer require laravel/breeze --dev
php artisan breeze:install #blade


composer require pacificdev/laravel_9_preset

#solo fino a versione 10
php artisan preset:ui bootstrap --auth

npm install bootstrap axios @fortawesome/fontawesome-free sass

#in vite config aggiungo agli alias
'~@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome'),

#copio la cartella dei webfont e se voglio la rinomino e la copio nella cartella font

#app.js
import "./bootstrap";
import "~resources/scss/app.scss";
import * as bootstrap from "bootstrap";
import.meta.glob(["../img/**", "../fonts/**"]);

#app.scss
@use './partials/variables' as *;

$fa-font-path: "../fonts/webfonts" !default;

@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/regular";
@import "~@fortawesome/fontawesome-free/scss/solid";
@import "~@fortawesome/fontawesome-free/scss/brands";

@import '~bootstrap/scss/bootstrap';



#vite.config.js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import * as path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/scss/app.scss", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    // Add resolve object and aliases
    resolve: {
        alias: {
            "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
            "~@fortawesome": path.resolve(__dirname, "node_modules/@fortawesome"),
            "~resources": "/resources/",
        },
    },
});

#sistemo (cambio/rimuovo) template e routing

#volendo personalizzo paginazione e pagine di errore
php artisan vendor:publish --tag=laravel-errors
php artisan vendor:publish --tag=laravel-pagination
php artisan lang:publish

#comandi git

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin your_git_url 
git push -u origin main


```
## Clono progetto da github 

```bash
# copio file .env.example e lo rinomino in .env

composer install

php artisan key:generate

npm install

# creo il database da phpmyadmin

# inserisco i dati per il collegamento al db in env

#creo migration
php artisan make:migration create_nome_tabella_table
php artisan make:migration update_users_table --table=users
php artisan make:migration add_phone_number_to_users_table

#lanciare migration
php artisan migrate

#revert migration
php artisan migrate:rollback


#popolare il db
php artisan make:seeder UsersTableSeeder

php artisan db:seed --class=UsersTableSeeder

# preparo le rotte file web.php es. 
Route::get('/books', [BookController::class, 'index'])->name('books.index');
# oppure resource route per tutte le operazioni CRUD
Route::resource('books', BookController::class);

# creo controller
php artisan make:controller NomeController
#con opzione resource controller
php artisan make:controller NomeController --resource


#creo model
php artisan make:model Nome 
#posso creare il model e contestualmente resource controller, migration, seeder e form request per validazioni
php artisan make:model Nome -rcms --requests

# creo le views relative

#creo form request per validazione
	
php artisan make:request StoreMomemodelRequest


```
## Auth

```bash
#in app/Providers/RouteServiceProvider.php modifico
public const HOME = '/admin';

# Se l’utente non è autenticato, sarà dirottato automaticamente verso la pagina di login.
# Questo comportamento è modificabile nel file in app/Http/Middleware/Authenticate.php

php artisan make:controller Admin/DashboardController
# nel controller
public function index(){
        return view('admin.dashboard');
    }

Route::middleware(['auth', 'verified'])
   ->name('admin.')
   ->prefix('admin')
   ->group(function () {
         Route::get('/', [DashboardController::class, 'index'])
         ->name('dashboard');
   });

....

Route::fallback(function() {
    return redirect()->route('admin.dashboard');
});

```
## Fileupload - File Storage

```bash
#In config/filestystems.php 
#Caricheremo i nostri file nella cartella storage/app/public
# modifichiamo quindi nel file env la chiave FILESYSTEM_DRIVER=public
'default' => env('FILESYSTEM_DRIVER', 'public'),

#lanciare comando
php artisan storage:link

#salvare (sarò nel metodo Store del Controller, in cui devo importare Storage)
use Illuminate\Support\Facades\Storage;

#in questo modo salvo nella cartella storage/app/public/nomecartella*
Storage::put('nomecartella', $data['image']); //ritorna il path
#or
$path = Storage::putFileAs(
    'avatars', $request->file('avatar'), $name
);

#*se voglio salvare il file in un disco diverso da quello di default, allora scrivo
$path = Storage::disk('nome')->put('uploads', $data['image']);

#per visualizzare 
<img src="{{ asset('storage/' . $post->cover_image) }}">
....


```
## Relazioni
```bash
#migration di esempio 

#up
Schema::table('posts', function (Blueprint $table) {

    $table->unsignedBigInteger('user_id');
    $table->foreign('user_id')
        ->references('id')
        ->on('users')->cascadeOnDelete();
});
# shortcut (se rispetto il naming di Laravel!)
    # $table->foreignId('user_id')->constrained()->cascadeOnDelete();

#down
#prima cancello relazione; solo dopo posso cancellare colonna
$table->dropForeign('posts_user_id_foreign');
$table->dropColumn('user_id');

#nei model
#editare i model con le funzioni - relazioni
#editare fillable o guarded
#importo l'altro model oggetto della relazione
#use Illuminate\Database\Eloquent\Relations\HasMany;

protected $guarded = [];

public function products():HasMany
{
   return $this->hasMany(Product::class);
}


```