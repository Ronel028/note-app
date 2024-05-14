<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Notes extends Model
{
    use HasFactory;

    protected $table = 'notes';

    protected $fillable = [
        'user_id',
        'title',
        'content'
    ];
}
