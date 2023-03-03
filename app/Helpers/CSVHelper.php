<?php
namespace App\Helpers;

use App\Models\User;

class CSVHelper
{
    public static function mapUsersCSV($users)
    {
        $columns = array('ID', 'Username', 'Email', 'Quizzes created', 'Quiz attempts', 'Challenge points', 'Trophy count', 'Is banned');

        $data = function() use($users, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($users as $user) {
                $row['ID'] = $user->id;
                $row['Username'] = $user->username;
                $row['Email'] = $user->email;
                $row['Quizzes created'] = Count($user->quizzes);
                $row['Quiz attempts'] = $user->scores->count();
                $row['Challenge points'] = $user->challenge_points;
                $row['Trophy count'] = $user->trophies->count();
                $row['Is banned'] = $user->isBanned() ? "True" : "False";

                fputcsv($file, array($row['ID'], $row['Username'], $row['Email'], $row['Quizzes created'], $row['Quiz attempts'], $row['Challenge points'], $row['Trophy count'], $row['Is banned']));
            }

            fclose($file);
        };

        return $data;
    }

}