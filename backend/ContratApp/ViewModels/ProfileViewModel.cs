using System.ComponentModel.DataAnnotations;

namespace ContratApp.ViewModels
{
    public class ProfileViewModel
    {
        [MaxLength(256)]
        public string? FirstName { get; set; }
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
        public Boolean? ContactByPhone { get; set; }
        public Boolean? ContactByEmail { get; set; }
        public Boolean? MercadoPago { get; set; } 
        public Boolean? CreditCard { get; set; }
        public Boolean? Cash { get; set; }

        [MaxLength(256)]
        public string? Latitude { get; set; }

        [MaxLength(256)]
        public string? Longitude { get; set; }

        [MaxLength(256)]
        public string? Price { get; set; }

    }
}
