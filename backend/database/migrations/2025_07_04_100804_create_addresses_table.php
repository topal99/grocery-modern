    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        public function up(): void
        {
            Schema::create('addresses', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->string('label'); // Contoh: "Rumah", "Kantor"
                $table->string('recipient_name');
                $table->string('phone_number');
                $table->text('full_address');
                $table->string('city');
                $table->string('province');
                $table->string('postal_code');
                $table->boolean('is_primary')->default(false); // Untuk menandai alamat utama
                $table->timestamps();
            });
        }

        public function down(): void
        {
            Schema::dropIfExists('addresses');
        }
    };
    