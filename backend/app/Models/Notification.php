<?php

namespace Grocery\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['user_id', 'message', 'link', 'read_at'];
}
