using Microsoft.AspNet.Authentication.Cookies;
using Microsoft.AspNet.Mvc;
using PhotoGallery.Infrastructure.Core;
using PhotoGallery.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TestApp.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        [HttpPost("authenticate")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel user)
        {
            var result = new ObjectResult(false);
            GenericResult authenticationResult = null;
            try
            {
                var claims = new List<Claim>();

                var claim = new Claim(ClaimTypes.Role, "Admin", ClaimValueTypes.String, user.Username);

                await HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)),
                    new Microsoft.AspNet.Http.Authentication.AuthenticationProperties { IsPersistent = user.RememberMe });


                authenticationResult = new GenericResult()
                {
                    Succeeded = true,
                    Message = "Authentication succeeded"
                };

            }
            catch (Exception ex)
            {
                authenticationResult = new GenericResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };


            }

            result = new ObjectResult(authenticationResult);
            return result;
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await HttpContext.Authentication.SignOutAsync("Cookies");
                return Ok();
            }
            catch 
            {
                return HttpBadRequest();
            }

        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] RegistrationViewModel user)
        {
            var result = new ObjectResult(false);
            GenericResult registrationResult = null;

            try
            {
                if (ModelState.IsValid)
                {

                    registrationResult = new GenericResult()
                    {
                        Succeeded = true,
                        Message = "Registration succeeded"
                    };

                }
                else
                {
                    registrationResult = new GenericResult()
                    {
                        Succeeded = false,
                        Message = "Invalid fields."
                    };
                }
            }
            catch (Exception ex)
            {
                registrationResult = new GenericResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };

            }

            result = new ObjectResult(registrationResult);
            return result;
        }
    }
}
