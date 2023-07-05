package com.kuraiji.VNRecommender;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UsersRepository extends
        PagingAndSortingRepository<Users, Long>,
        CrudRepository<Users, Long>
{

    List<Users> findByEmail(@Param("email") String email);
    Users findById(@Param("id") long id);
}
