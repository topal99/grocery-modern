<?php

namespace Grocery\Events;

  use Grocery\Models\Order;
    use Illuminate\Foundation\Events\Dispatchable;
    use Illuminate\Queue\SerializesModels;

    class NewOrderReceived
    {
        use Dispatchable, SerializesModels;
        public $order;
        public function __construct(Order $order)
        {
            $this->order = $order;
        }
    }
    