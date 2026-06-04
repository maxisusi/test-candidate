<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260522112045 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create departments and employees tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            CREATE TABLE departments (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name VARCHAR(255) NOT NULL
            )
        SQL);

        $this->addSql(<<<'SQL'
            CREATE TABLE employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                department_id INTEGER DEFAULT NULL,
                manager_id INTEGER DEFAULT NULL,
                CONSTRAINT FK_employees_department FOREIGN KEY (department_id) REFERENCES departments (id) NOT DEFERRABLE INITIALLY IMMEDIATE,
                CONSTRAINT FK_employees_manager FOREIGN KEY (manager_id) REFERENCES employees (id) NOT DEFERRABLE INITIALLY IMMEDIATE
            )
        SQL);

        $this->addSql('CREATE INDEX IDX_employees_department ON employees (department_id)');
        $this->addSql('CREATE INDEX IDX_employees_manager ON employees (manager_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE employees');
        $this->addSql('DROP TABLE departments');
    }
}
