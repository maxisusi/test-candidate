<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260427000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create product table and seed test data';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            CREATE TABLE product (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name VARCHAR(255) NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                created_at DATETIME NOT NULL
            )
        SQL);

        $this->addSql(<<<'SQL'
            INSERT INTO product (name, price, created_at) VALUES
                ('Wireless Keyboard', 49.99, datetime('now')),
                ('USB-C Hub',         29.99, datetime('now')),
                ('Mechanical Pencil',  9.99, datetime('now'))
        SQL);
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE product');
    }
}
