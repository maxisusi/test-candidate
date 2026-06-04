<?php

namespace App\Controller;

use App\Repository\EmployeeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class DirectoryController extends AbstractController
{
    #[Route('/api/directory', methods: ['GET'])]
    public function list(Request $request, EmployeeRepository $repo): JsonResponse
    {
        $search = $request->query->get('search');
        $employees = $repo->findAll();

        $result = [];
        foreach ($employees as $employee) {
            if ($search && stripos($employee->getLastName(), $search) === false) {
                continue;
            }

            $result[] = [
                'id' => $employee->getId(),
                'firstName' => $employee->getFirstName(),
                'lastName' => $employee->getLastName(),
                'department' => $employee->getDepartment()?->getName(),
                'manager' => $employee->getManager()
                    ? $employee->getManager()->getFirstName() . ' ' . $employee->getManager()->getLastName()
                    : null,
            ];
        }

        return new JsonResponse($result);
    }

    #[Route('/api/directory/stats', methods: ['GET'])]
    public function stats(EmployeeRepository $repo): JsonResponse
    {
        return new JsonResponse([]);
    }
}
