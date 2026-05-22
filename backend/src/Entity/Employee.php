<?php

namespace App\Entity;

use App\Repository\EmployeeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ORM\Table(name: 'employees')]
class Employee
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private int $id;

    #[ORM\Column]
    private string $firstName;

    #[ORM\Column]
    private string $lastName;

    #[ORM\ManyToOne(targetEntity: Department::class, fetch: 'LAZY')]
    #[ORM\JoinColumn(nullable: false)]
    private Department $department;

    #[ORM\ManyToOne(targetEntity: Employee::class, fetch: 'LAZY')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Employee $manager = null;

    public function __construct(string $firstName, string $lastName, Department $department)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->department = $department;
    }

    public function getId(): int { return $this->id; }
    public function getFirstName(): string { return $this->firstName; }
    public function getLastName(): string { return $this->lastName; }
    public function getDepartment(): Department { return $this->department; }
    public function getManager(): ?Employee { return $this->manager; }

    public function setManager(?Employee $manager): void { $this->manager = $manager; }
}
