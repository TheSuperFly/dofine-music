<div class="wrap">
    <h2>Résultat des votes</h2>

    <p>Voici les votes que nous avons jusqu'à présent.

    Ils ne prennent pas en compte ceux qui ont voté plusieurs fois.
    </p>

    <table class="widefat fixed">
        <thead>
        <tr>
            <th>ID du groupe</th>
            <th>Nom du groupe</th>
            <th>Nombre de Votes</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($resultat as $r): ?>
            <tr>
                <td><?= $r->bandID ?></td>
                <td><?= $r->bandName ?></td>
                <td><?= $r->nbrVotes ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

</div>