using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models
{
    public class User
    {
        [Key]
        [MaxLength(450)]
        public string? Id { get; set; }

        [MaxLength(256)]
        public string? Email { get; set; }
        
        [Required]
        [MaxLength(256)]
        public string? FirstName { get; set; }
        
        [Required]
        [MaxLength(256)]
        public string? LastName { get; set; }

        [MaxLength(256)]
        public string? DNI { get; set; }

        public DateTime? BirthDay { get; set; }

        [MaxLength(256)]
        public string? Country { get; set; }

        [MaxLength(256)]
        public string? State { get; set; }

        [MaxLength(256)]
        public string? Location { get; set; }
        public string? SrcImage { get; set; }

        [MaxLength(256)]
        public string? Cellphone { get; set; }
        public Boolean? ContactByPhone { get; set; } = true;
        public Boolean? ContactByEmail { get; set; } = true;
        public Boolean? MercadoPago { get; set; } = false;
        public Boolean? CreditCard { get; set; } = false;
        public Boolean? Cash { get; set; } = false;

        [MaxLength(256)]
        public string? Latitude { get; set; }
        
        [MaxLength(256)]
        public string? Longitude { get; set; }

        [MaxLength(256)]
        public string? Price { get; set; }

        public ICollection<UserSpeciality>? UserSpecialities { get; set; }
    }
}
