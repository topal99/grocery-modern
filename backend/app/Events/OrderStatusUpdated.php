<?php

namespace Grocery\Events;

use Grocery\Models\Order;
    use Grocery\Models\User;
    use Illuminate\Foundation\Events\Dispatchable;
    use Illuminate\Queue\SerializesModels;

    class OrderStatusUpdated
    {
        use Dispatchable, SerializesModels;
        public $order;
        public $customer;
        public function __construct(Order $order, User $customer)
        {
            $this->order = $order;
            $this->customer = $customer;
        }
    }
    
